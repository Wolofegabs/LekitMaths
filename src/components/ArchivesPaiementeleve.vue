<template>
    <div class="one-eleve" v-if="this.eleve">
        <div v-if="!frais" class="progress mt-3">
            <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar"
                :style="{ width: this.calculatePaymentPercentage + '%' }" :aria-valuenow="this.calculatePaymentPercentage"
                aria-valuemin="0" aria-valuemax="100">
               
            </div>
        </div>
        
        <span v-if="!frais" class="text-success">Total:{{ this.calculateTotalAmount }} fcfa</span>
        <p v-if="!frais" class="text-warning">Reste:{{ this.calculateRemainingAmount }} fcfa</p>
        <p v-if="this.calculateRemainingAmount === 0" class="text-warning"> Vous avez soldé . My school vous remercie!!</p>
        <p v-if="!frais" class="text-primary">Pourcentage:{{ this.calculatePaymentPercentage }}%</p>
        <div class="container">
            <div class="row">
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Montant</th>
                                <th v-if="frais">Raison</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="listeSuppl.length > 0 && this.frais">
                            <tr v-for="payment in listeSuppl" :key="payment.id">
                                <td>{{ payment.id }}</td>
                                <td>{{ payment.valeur }}</td>
                                <td v-if="frais">{{ payment.raison }}</td>
                                <td>{{ payment.date }}</td>

                                <td>

                                 
                                    <button class="btn btn-sm btn-success ml-2" @click="generateReceipt(payment)">
                                        <i class="fas fa-file-alt"></i>
                                    </button>

                                </td>
                            </tr>
                        </tbody>
                        <tbody v-if="listePayments.length > 0 && !this.frais">
                            <tr v-for="payment in listePayments" :key="payment.id">
                                <td>{{ payment.id }}</td>
                                <td>{{ payment.valeur }}</td>
                                <td v-if="frais">{{ payment.raison }}</td>
                                <td>{{ payment.date }}</td>

                                <td>

                                    <button class="btn btn-sm btn-success ml-2" @click="generateReceipt(payment)">
                                        <i class="fas fa-file-alt"></i>
                                    </button>

                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import html2pdf from 'html2pdf.js';



export default {
    name: 'InfosEleve',
    props: {
        frais: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const currentPromoScolaire = JSON.parse(localStorage.getItem("currentPromoScolaire"));
        const supplementaires = currentPromoScolaire.supplementaires;// Liste de tout les supplémentaires
        const payments = currentPromoScolaire.payments; // Liste de tout les scolraités
        return {
        
            listePayments: [],//Liste des paiements de l'élève
            eleve: JSON.parse(sessionStorage.getItem('eleve')),
            supplementaires,
            payments,
            currentPromoScolaire: JSON.parse(sessionStorage.getItem("currentPromoScolaire")) ||{},

           

            totalAmount: null,
            elevePayment: {},
            listeSuppl: [],//Liste des supplémentaires de l'élève


    
           
        }

    },
    computed: {
        listeTraitee() {
            if (this.frais) {
                const supplementaires = this.currentPromoScolaire.supplementaires
                return supplementaires
            } else {
                const payments = this.currentPromoScolaire.payments
                return payments
            }


        },
        // Méthode pour calculer le montant total des paiements
        calculateTotalAmount() {
            let totalAmount = this.eleve.scolarite;

            return totalAmount;
        },//Fin de cette methode


        // Méthode pour calculer le montant restant à payer
        calculateRemainingAmount() {
            const totalAmount = this.calculateTotalAmount;
            const remainingAmount = totalAmount - this.calculatePaidAmount;
            return remainingAmount;
        },
        // Méthode pour calculer le montant déjà payé
        calculatePaidAmount() {
            let paidAmount = 0;
            if (this.frais) {
                for (const payment of this.listeSuppl) {
                    paidAmount += payment.valeur;
                }
            } else {
                for (const payment of this.listePayments) {
                    paidAmount += payment.valeur;
                }
            }

            return paidAmount;
        },
        // Méthode pour calculer le pourcentage déjà payé
        calculatePaymentPercentage() {
            const totalAmount = this.calculateTotalAmount;
            const paidAmount = this.calculatePaidAmount;
            const paymentPercentage = (paidAmount / totalAmount) * 100;
            return paymentPercentage.toFixed(2);
        },
    },
    mounted() {
        if (!this.eleve) {
            this.$router.push('/archives'); // Redirige vers la page de connexion
        }
        console.log(this.eleve.reste)
        console.log(this.calculatePaidAmount)
       

   

        this.calculatePaidAmount;
        this.calculatePaymentPercentage;
        this.searchPayments();
        if (this.frais) {
            if (localStorage.currentPromoScolaire.supplementaires) {
                try {
                    this.supplementaires = this.currentPromoScolaire.supplementaires;
                } catch (e) {
                    localStorage.removeItem('myschool');
                }
            }
        } else {
            if (localStorage.currentPromoScolaire.payments) {
                try {
                    this.payments = this.currentPromoScolaire.payments;
                } catch (e) {
                    localStorage.removeItem('myschool');
                }
            }
        }

    },
    methods: {
        loadFromLocalStorage() {
            const data = this.currentPromoScolaire.payments;
            if (data) {
                this.payments = JSON.parse(data);
            }
        },


        //Pour recherher les paiements de l'élève
        searchPayments() {
            const searchMat = this.eleve.mat;
            if (this.frais) {
                // const payments = JSON.parse(localStorage.getItem('payments')) || [];
                this.listeSuppl = this.listeTraitee.filter(payment => payment.mat === searchMat);

                return this.listeSuppl;
            } else {
                // const payments = JSON.parse(localStorage.getItem('payments')) || [];
                this.listePayments = this.listeTraitee.filter(payment => payment.mat === searchMat);
                return this.listePayments;
            }

        },
        // Méthode pour générer le reçu d'un paiement
        generateReceipt(payment) {
            // Générer le contenu du reçu avec les informations du paiement
            var receiptContent = "";
            if (this.frais) {
                receiptContent = `
                        <div class="invoice">
            <h2>My School</h2>
          <h3>Facture de paiement</h3>
          <div class="invoice-details">
            <p><span class="label">ID:</span> <span class="value">${payment.id}</span></p>
            <p><span class="label">Classe:</span> <span class="value">${this.eleve.className}</span></p>
            <p><span class="label">Nom:</span> <span class="value">${this.eleve.nom}</span></p>
            <p><span class="label">Prénom:</span> <span class="value">${this.eleve.prenom}</span></p>
            <p><span class="label">Montant:</span> <span class="value">${payment.valeur} fcfa</span></p>
            <p><span class="label">Raison:</span> <span class="value">${payment.raison}</span></p>
            <p><span class="label">Type:</span> <span class="value">${payment.type}</span></p>
            <p><span class="label">Date:</span> <span class="value">${payment.date}</span></p>
          </div>
        </div>`;
            } else {
                receiptContent = `
                        <div class="invoice">
            <h2>My School</h2>
          <h3>Facture de paiement</h3>
          <div class="invoice-details">
            <p><span class="label">ID:</span> <span class="value">${payment.id}</span></p>
            <p><span class="label">Classe:</span> <span class="value">${this.eleve.className}</span></p>
            <p><span class="label">Nom:</span> <span class="value">${this.eleve.nom}</span></p>
            <p><span class="label">Prénom:</span> <span class="value">${this.eleve.prenom}</span></p>
            <p><span class="label">Montant:</span> <span class="value">${payment.valeur} fcfa</span></p>
            <p><span class="label">Reste:</span> <span class="value">${this.calculateRemainingAmount} fcfa</span></p>
            <p><span class="label">Type:</span> <span class="value">${payment.type}</span></p>
            <p><span class="label">Date:</span> <span class="value">${payment.date}</span></p>
          </div>
        </div>`;
            }

            const options = {
                filename: 'My school.pdf',
                html2canvas: {},
                jsPDF: { orientation: 'portrait' }
            };

            html2pdf().set(options).from(receiptContent).save();
            // Afficher le contenu du reçu dans la console
            console.log(receiptContent);

            // Afficher un message d'alerte pour indiquer que le reçu a été généré
            alert("Le reçu a été généré !");
        },//Fin methode pour générer un reçu






    }


}

</script>

<style lang="scss">
#OneEleve {
    .pagetitle {
        color: #4154f1;

    }

    font-family: Georgia,
    'Times New Roman',
    Times,
    serif;

    .info-eleve {

        .card {
            margin-bottom: 30px;
            padding-bottom: 10px;

            background-color: rgb(255, 255, 255);
            border-radius: 10px;
            box-shadow: rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
            box-sizing: border-box;
            color: rgb(3, 30, 35);

            .card-title {
                color: #4154f1;
            }

        }

        padding-bottom: 10px;
        margin-bottom: 5px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        box-shadow :rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
        box-sizing: border-box;
        color: rgb(3, 30, 35);


    }

    .invoice {
        font-family: Georgia, 'Times New Roman', Times, serif;
        margin: auto;
        padding: 20px;
        background-color: #f9f9f9;
        max-width: 600px;
        /* Ajustez la largeur maximale selon vos besoins */
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .invoice h1 {
        font-size: 20px;
        margin-bottom: 10px;
        color: #333;
        /* Couleur du titre */
    }

    .invoice .invoice-details {
        margin-bottom: 20px;
        text-align: center;
    }

    .invoice .invoice-details p {
        margin: 5px 0;
        font-size: 14px;
        color: #777;
        /* Couleur du texte des détails */
    }

    .invoice .invoice-details .label {
        font-weight: bold;
    }

    .invoice .invoice-details .value {
        font-style: italic;
    }
}
</style>
