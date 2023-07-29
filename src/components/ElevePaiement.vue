<template>
    <div class="one-eleve" v-if="this.eleve">
          <div v-if="!frais" class="progress mt-3">
           <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" :style="{ width: this.calculatePaymentPercentage() + '%' }"
                  :aria-valuenow="this.calculatePaymentPercentage()"
                  aria-valuemin="0"
                  aria-valuemax="100">
                  <span class="tranche">{{ currentTranche }}</span>
          </div>
        </div>
        <div v-if="!frais" class="text-center">
          <span>{{ currentTranche }}</span> - <span>{{ currentDate }}</span>
        </div>
              <span v-if="!frais" class="text-success">Total:{{ this.calculateTotalAmount() }} fcfa</span>
              <p v-if="!frais" class="text-warning">Reste:{{ this.calculateRemainingAmount() }} fcfa</p>
              <p v-if="this.calculateRemainingAmount()===0 && !frais" class="text-warning"> Vous avez soldé . My school vous remercie!!</p>
              <p v-if="!frais" class="text-primary">Pourcentage:{{ this.calculatePaymentPercentage() }}%</p>
                                                  <div class="container">
                                            <div class="row">

                                                <div class="col-md-12 ml-2">
                        <button class="btn btn-primary " @click="showAddPaymentForm">Ajouter un
                                                        paiement</button>
                                                    <!-- Formulaire d'ajout de paiement -->
                                                    <div v-if="showAddPayment" class="container mt-3">
                                                        <h5>Ajouter un paiement</h5>
                                                        <form @submit.prevent="addPayment">
                                                            <div class="form-group">
                                                                <label for="amount">Montant</label>
                                                                <input type="number" class="form-control" id="amount"
                                                                    v-model="newPayment.valeur" required>
                                                            </div>
                                                            <div v-if="frais" class="form-group">
                                                                <label for="raison">Raison</label>
                                                                <input type="text" class="form-control" id="raison"
                                                                    v-model="newPayment.raison" required>
                                                            </div>

                                                            <button type="submit" class="btn btn-primary mr-2 my-2">Ajouter</button>
                                                            <button class="btn btn-secondary mx-2"
                                                                @click="showAddPayment = false">Annuler</button>
                                                        </form>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-12">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Montant</th>
                                                                <th v-if="frais">Raison</th>
                                                                <th v-if="!frais">Arrièré</th>
                                                                <th>Date</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody  v-if="listeSuppl.length > 0 &&  this.frais">
                                                            <tr v-for="payment in listeSuppl" :key="payment.id">
                                                                <td>{{ payment.id }}</td>
                                                                <td>{{ payment.valeur }}</td>
                                                                <td v-if="frais">{{ payment.raison }}</td>
                                                                <td v-if="!frais">{{ payment.arriere }}</td>
                                                                <td>{{ payment.date }}</td>

                                                                <td>

                                                                    <button class="btn btn-sm btn-success ml-2"
                                                                        @click="generateReceipt(payment)">
                                                                        <i class="fas fa-file-alt"></i>
                                                                    </button>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                           <tbody  v-if="listePayments.length > 0 && !this.frais">
                                                                <tr v-for="payment in listePayments" :key="payment.id">
                                                                    <td>{{ payment.id }}</td>
                                                                    <td>{{ payment.valeur }}</td>
                                                                    <td v-if="!frais">{{ payment.arriere }}</td>
                                                                    <td v-if="frais">{{ payment.raison }}</td>
                                                                    <td>{{ payment.date }}</td>

                                                                    <td>

                                                                        <button class="btn btn-sm btn-success ml-2"
                                                                            @click="generateReceipt(payment)">
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
            type:Boolean ,
            default: false
        }
    },
    data() {
       const myschool= JSON.parse(localStorage.getItem("myschool")) 
        const supplementaires = myschool[myschool.length - 1].supplementaires;// Liste de tout les supplémentaires
        const payments = myschool[myschool.length - 1].payments; // Liste de tout les scolraités
        return {
           
            
            listePayments: [],//Liste des paiements de l'élève
            eleve: JSON.parse(sessionStorage.getItem('eleve')),
            supplementaires,
            payments,
            myschool: JSON.parse(localStorage.getItem("myschool")) || [],
            
            currentTranche: '', // Tranche en cours
            currentDate: '', // Date correspondante
            
            totalAmount: null,
            pourcentPaye:null,
            listeSuppl:[],//Liste des supplémentaires de l'élève
           
            newPayment: { // Nouveau paiement à ajouter
                mat: null,
                valeur: null,
                arriere:null,
                raison: "",
                type:"espèce",
                date: null,
              
            },
         
            showAddPayment: false, // Affichage du formulaire d'ajout de paiement
           
        }

    },
    computed: {
        listeTraitee() {
            if (this.frais) {
                const supplementaires = this.myschool[this.myschool.length - 1].supplementaires
                return supplementaires
            } else {
                const payments = this.myschool[this.myschool.length - 1].payments
                 return payments
            }
         
            
        },
       
    },
    mounted() {
            if (!this.eleve) {
            this.$router.push('/admin'); // Redirige vers la page de connexion
        }
        

        this.savePayments();
        
        this.calculatePaidAmount();
        this.calculatePaymentPercentage();
        this.updateProgress()
        this.searchPayments();
        if (this.frais) {
            if (localStorage.myschool[this.myschool.length - 1].supplementaires) {
                try {
                    this.supplementaires = this.myschool[this.myschool.length - 1].supplementaires;
                } catch (e) {
                    localStorage.removeItem('myschool');
                }
            }
        } else {
            if (localStorage.myschool[this.myschool.length - 1].payments) {
                try {
                    this.payments = this.myschool[this.myschool.length - 1].payments;
                } catch (e) {
                    localStorage.removeItem('myschool');
                }
            }
        }

    },
    methods: {

       
        
        // Pour mettre à jour les infos dans le progres bar
         updateProgress() {
            

            if (this.pourcentPaye < this.eleve.tranche1.pourcent) {
                this.currentTranche = 'Tranche1 - ' + this.eleve.tranche1.pourcent + '%';
                this.currentDate = this.eleve.tranche1.date;

            } else if (this.pourcentPaye < this.eleve.tranche2.pourcent) {
                this.currentTranche = 'Tranche2 - ' + this.eleve.tranche2.pourcent + '%';
                this.currentDate = this.eleve.tranche2.date;
            } else if (this.pourcentPaye < this.eleve.tranche3.pourcent) {
                this.currentTranche = 'Tranche3 - ' + this.eleve.tranche3.pourcent + '%';
                this.currentDate = this.eleve.tranche3.date;
            } else {
                this.currentTranche = 'Paiement complet';
                this.currentDate = '';
            }
            console.log(this.pourcentPaye)

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
     /*        miseAJourReste(eleve) {
            const promotion = this.myschool[this.myschool.length - 1].promotions.find(promotion => promotion.salles.some(salle => salle.eleves.includes(eleve)));
            const scolarite = promotion.scolarite;
                const montantPaiements = this.calculatePaidAmount;

            eleve.reste = scolarite - montantPaiements;

            // Mettre à jour l'élève dans le local storage
         this.savePayments();
        }, */
  
        // Méthode pour ajouter un paiement
        addPayment() {
            // Générer un nouvel ID en incrémentant le dernier ID existant
            var lastPaymentId = null;
            if (this.frais) {
                 lastPaymentId = this.listeSuppl.length > 0 ? this.listeSuppl[this.listeSuppl.length - 1].id : 0;
            } else {
                 lastPaymentId = this.listePayments.length > 0 ? this.listePayments[this.listePayments.length - 1].id : 0;
            }
           
            const newPaymentId = lastPaymentId + 1;

            // Créer le nouveau paiement avec l'ID généré et les informations fournies
            const date = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const dateTimeString = date.toLocaleDateString('fr-FR', options);

            console.log(dateTimeString);
          
            const newPayment = {
                mat: this.eleve.mat,
                id: newPaymentId,
                valeur: this.newPayment.valeur,
                arriere:this.newPayment.arriere,
                raison: this.newPayment.raison,
                type:this.newPayment.type,
                date: dateTimeString,
                

            };
             // Ajouter le nouveau paiement à la liste des paiements
            if (this.frais && typeof newPayment.valeur === "number" && Number.isInteger(newPayment.valeur) && newPayment.valeur > 0 && newPayment.valeur % 5 === 0 && typeof newPayment.raison === "string" &&  !/\d/.test(newPayment.raison)) {
                            
                    this.supplementaires.push(newPayment);
                    // Réinitialiser le formulaire d'ajout de paiement
                    this.newPayment = {
                        valeur: null,
                        raison: ""

                    };
                this.savePayments();
                          // Mettre à jour le reste de l'élève
               // this.miseAJourReste(this.eleve.mat);

                    // Cacher le formulaire d'ajout de paiement
                    this.showAddPayment = false;

                    // Calculer les montants et le pourcentage mis à jour
                    this.calculateTotalAmount();
                    this.calculateRemainingAmount();
                this.calculatePaymentPercentage();
                this.updateProgress();

                    // Afficher un message d'alerte pour indiquer le succès de l'opération
                    alert("Ce frais a été ajouté avec succès !");
                
            } else {
                        if (!this.frais && this.calculateRemainingAmount() >= newPayment.valeur && typeof newPayment.valeur === "number" && Number.isInteger(newPayment.valeur) && newPayment.valeur > 0 && newPayment.valeur % 5 === 0) {
                    this.payments.push(newPayment);
                    // Réinitialiser le formulaire d'ajout de paiement
                    this.newPayment = {
                        valeur: null,
                        raison: ""

                    };
                    this.savePayments();

                    // Cacher le formulaire d'ajout de paiement
                    this.showAddPayment = false;

                    // Calculer les montants et le pourcentage mis à jour
                    this.calculateTotalAmount();
                    this.calculateRemainingAmount();
                            this.calculatePaymentPercentage();
                    this.updateProgress()

                    // Afficher un message d'alerte pour indiquer le succès de l'opération
                    alert("Le paiement a été ajouté avec succès !");
                } else {
                    alert(" Erreur!! \n Soit une valeur erronée \n Soit le montant est supérieur ou n'est pas multiple de 5fcfa \n Il ne vous reste que: " + this.calculateRemainingAmount);
                }
            }

        },//Fin de methode pour ajouter un paiment
        // Méthode pour afficher le formulaire d'ajout de paiement
        showAddPaymentForm() {
            this.showAddPayment = true;
        },//Fin de methode pour afficher le formulaire d'ajout
      

        // Méthode pour générer le reçu d'un paiement
        generateReceipt(payment) {
            // Générer le contenu du reçu avec les informations du paiement
            var receiptContent = "";
            if (this.frais) {
                receiptContent = `
        <div style="background-color: #012970; padding: 20px;">
          <div style="display: flex; justify-content: space-between; color: #ffffff;">
            <div style="text-align: left;"><h2>My School</h2></div>
            <div style="text-align: right;">
              <img src="../assets/src/assets/logo9_7_194325.png" style="width: 100px;">
            </div>
          </div>
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div style="text-align: left; color: #ffffff;">
              
              <h3>Facture de paiement</h3>
              <div class="invoice-details">
                <p><span class="label">Numéro:</span> <span class="value">${payment.id}</span></p>
            <p><span class="label">Classe:</span> <span class="value">${this.eleve.className}</span></p>
            <p><span class="label">Nom:</span> <span class="value">${this.eleve.nom}</span></p>
            <p><span class="label">Prénom:</span> <span class="value">${this.eleve.prenom}</span></p>
            <p><span class="label">Montant:</span> <span class="value">${payment.valeur} fcfa</span></p>
            <p><span class="label">Raison:</span> <span class="value">${payment.raison}</span></p>
            <p><span class="label">Type:</span> <span class="value">${payment.type}</span></p>
            <p><span class="label">Date:</span> <span class="value">${payment.date}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;
            } else {
                receiptContent = `
        <div style="background-color: #012970; padding: 20px;">
          <div style="display: flex; justify-content: space-between; color: #ffffff;">
            <div style="text-align: left;"><h2>My School</h2></div>
            <div style="text-align: right;">
              <img src="../assets/src/assets/logo9_7_194325.png" style="width: 100px;">
            </div>
          </div>
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div style="text-align: left; color: #ffffff;">
              
              <h3>Facture de paiement</h3>
              <div class="invoice-details">
            <p><span class="label">Numéro:</span> <span class="value">${payment.id}</span></p>
            <p><span class="label">Classe:</span> <span class="value">${this.eleve.className}</span></p>
            <p><span class="label">Nom:</span> <span class="value">${this.eleve.nom}</span></p>
            <p><span class="label">Prénom:</span> <span class="value">${this.eleve.prenom}</span></p>
            <p><span class="label">Arrièré:</span> <span class="value">${payment.arriere} fcfa</span></p>
            <p><span class="label">Montant:</span> <span class="value">${payment.valeur} fcfa</span></p>
            <p><span class="label">Reste:</span> <span class="value">${this.calculateRemainingAmount()} fcfa</span></p>
            <p><span class="label">Type:</span> <span class="value">${payment.type}</span></p>
            <p><span class="label">Date:</span> <span class="value">${payment.date}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;
            }


            const options = {
                filename: 'MySchool.pdf',
                html2canvas: {},
                jsPDF: { orientation: 'portrait' }
            };

            html2pdf().set(options).from(receiptContent).save();

            console.log(receiptContent);

            alert("Le reçu a été généré !");
        },//Fin methode pour générer un reçu
                 // Méthode pour calculer le montant total des paiements
        calculateTotalAmount() {
            this.totalAmount = this.eleve.scolarite;

            return this.totalAmount;
        },//Fin de cette methode

        // Méthode pour calculer le montant restant à payer
        calculateRemainingAmount() {
            const totalAmount = this.calculateTotalAmount();
            const remainingAmount = totalAmount - this.calculatePaidAmount();
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
            const totalAmount = this.calculateTotalAmount();
            const paidAmount = this.calculatePaidAmount();
            const paymentPercentage = (paidAmount / totalAmount) * 100;
            this.pourcentPaye = paymentPercentage;
            return paymentPercentage.toFixed(2);
        },


        // Pour enregistrer les payments dans le local storage
        savePayments() {
            if (this.frais) {
                this.myschool[this.myschool.length - 1].supplementaires = this.supplementaires;
                localStorage.setItem('myschool', JSON.stringify(this.myschool))
            } else {
                this.myschool[this.myschool.length - 1].payments = this.payments;
                localStorage.setItem('myschool', JSON.stringify(this.myschool))
            }
             this.searchPayments()
        },


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
  font-family:Georgia, 'Times New Roman', Times, serif;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 600px; /* Ajustez la largeur maximale selon vos besoins */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.invoice h1 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333; /* Couleur du titre */
}

.invoice .invoice-details {
  margin-bottom: 20px;
  text-align: center;
}

.invoice .invoice-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #777; /* Couleur du texte des détails */
}

.invoice .invoice-details .label {
  font-weight: bold;
}

.invoice .invoice-details .value {
  font-style: italic;
}
}</style>
