<template>
    <div id="ClassePage" v-if="this.currentPromoScolaire && this.classes">
        <div class="pagetitle">
            <h1>Nos élèves</h1>

        </div><!-- End Page Title -->

        <section class="one-classe" >
            <div class="row">
                <div class="col-lg-12">

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ classes.name }}</h5>

                            <table class="table datatable">
                                <thead>
                                    <tr class="classe">
                                        <th scope="col">Id</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Prénom</th>
                                        <th scope="col">Tranche Actuelle </th>
                                        <th>Montant Total</th>
                                        <th>Statu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="une_classe" v-for="eleve in eleves" :key="eleve.mat">
                                        <td scope="row">{{ eleve.mat }}</td>
                                        <td>{{ eleve.nom }}</td>
                                        <td>{{ eleve.prenom }}</td>
                                        <td>{{ this.getTrancheActuelle() }}</td>
                                        <td>{{ this.montantPaiements(eleve) }} fcfa</td>
                                        <td>{{ this.statutEleve(eleve) }}</td>




                                    </tr>
                                </tbody>


                            </table>
                            <p>{{ this.action }} </p>
                            <button class="btn btn-danger" @click="this.genererPDF()">Impayés</button>

                        </div>
                    </div>

                </div>
            </div>
        </section>

    </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default {
    name: 'ClassePage',
    data() {


        return {
            currentPromoScolaire: JSON.parse(sessionStorage.getItem("currentPromoScolaire")) || [],
            action: "",

            classes: JSON.parse(sessionStorage.getItem('classItem')),
            listePayments: [], // Liste des paiements



        };
    },
    computed: {
        eleves() {
            return this.classes.eleves;
        }
    },
    mounted() {
        if (!this.currentPromoScolaire||!this.classes) {
            this.$router.push('/archives'); // Redirige vers la page de connexion
        }
        console.log(this.classes.scolarite)
       



    },

    methods: {
  
        montantPaiements(eleve) {
            // Calculer le montant total des paiements de l'élève
            const paiements = this.currentPromoScolaire.payments.filter(p => p.mat === eleve.mat);
            return paiements.reduce((total, paiement) => total + paiement.valeur, 0);
        },
        statutEleve(eleve) {
            // Vérifier le statut de l'élève
            const now = new Date();
            const tranche = this.getTrancheActuelle();
            const montantTotal = this.montantPaiements(eleve);

            if (montantTotal < tranche.pourcent && now > new Date(tranche.date)) {
                return 'Impayé';
            } else {
                return 'En règle';
            }
        },
        getTrancheActuelle() {
            // Trouver la tranche actuelle en fonction de la date actuelle
            const now = new Date();
            if (now > new Date(this.classes.tranche3.date)) {
                return this.classes.tranche3;
            } else if (now > new Date(this.classes.tranche2.date)) {
                return this.classes.tranche2;
            } else {
                return this.classes.tranche1;
            }
        },
        // Dans la méthode genererPDF()

        genererPDF() {
            const titre = `Liste des impayés de ${this.classes.name}`;

            // Filter the students who are unpaid
            const elevesImpayes = this.eleves.filter(eleve => this.statutEleve(eleve) === 'Impayé');
            var content = [];
            var styles = [];
            console.log(elevesImpayes)
            if (elevesImpayes.length > 0) {
                // Generate the content for the PDF
                content = [
                    { text: titre, style: 'header' },
                    { text: '\n' }, // Add line breaks or spaces as needed
                    {
                        table: {
                            headerRows: 1,
                            widths: ['auto', 'auto', 'auto', 'auto'],
                            body: [
                                ['Matricule', 'Nom', 'Prénom', 'Montant des paiements'],
                                ...elevesImpayes.map(eleve => [
                                    eleve.mat,
                                    eleve.nom,
                                    eleve.prenom,
                                    this.montantPaiements(eleve),
                                ]),
                            ],
                        },
                    },
                ];

                // Define styles
                styles = {
                    header: {
                        fontSize: 16,
                        bold: true,
                        color: 'blue',
                        alignment: 'center',
                        margin: [0, 0, 0, 10], // Top, right, bottom, left margins
                    },
                };
                // PDF document configuration
                const docDefinition = {
                    content,
                    styles,
                };

                // Generate the PDF file
                pdfMake.createPdf(docDefinition).download('liste_impayes.pdf');

            } else {
                this.action = " Attention: Aucun impayé !"
            }

        },

    },



};
</script>

<style lang="scss">
#ClassePage {
    .pagetitle {

        color: #4154f1;
        display: flex;
        justify-content: space-between;

    }

    font-family: Georgia,
    'Times New Roman',
    Times,
    serif;

    .one-classe {
        padding-bottom: 10px;
        margin-bottom: 5px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        box-shadow: rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
        box-sizing: border-box;
        color: rgb(3, 30, 35);
        list-style: none;

    }
}
</style>