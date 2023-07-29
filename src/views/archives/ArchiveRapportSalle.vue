<!-- salle-report.vue -->
<template>
    <div v-if="this.currentPromoScolaire">
        <h2>Rapport par salle</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Salle</th>
                    <th>Effectif</th>
                    <th>Total</th>
                    <th>Total Actuel</th>
                    <th>Reste</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="salle in salles" :key="salle.id">
                    <td>{{ salle.name }}</td>
                    <td>{{ getSalleEffectif(salle) }}</td>
                    <td>{{ getSalleTotal(salle) }} fcfa</td>
                    <td>{{ getSalleTotalActuel(salle) }} fcfa</td>
                    <td>{{ getSalleReste(salle) }} fcfa</td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="generatePDF()">Télécharger le rapport </button>
    </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
    data() {
        return {
            salles: [], // Données récupérées depuis le local storage
            currentPromoScolaire: JSON.parse(sessionStorage.getItem("currentPromoScolaire")) || [],
            promotions: [],
            payments: [],

        };
    },
    mounted() {
        if (!this.currentPromoScolaire) {
            this.$router.push('/archives'); // Redirige vers la page de connexion
        }
        this.recupererPromotions()
        this.recupererSalles()
    },
    methods: {
        recupererPromotions() {
            // Vérifier s'il y a des objets promoScolaire dans myschool
            if (this.currentPromoScolaire ) {
                // Récupérer le dernier objet promoScolaire
                this.promotions = this.currentPromoScolaire.promotions;
                this.payments = this.currentPromoScolaire.payments;
            }
        },
        recupererSalles() {

            for (const classe of this.promotions) {
                for (const salle of classe.salles) {
                    const sal = {
                        ...salle,

                        scolarite: classe.scolarite,

                    };

                    this.salles.push(sal)
                }
            }
        },
        getSalleEffectif(salle) {
            // Récupérer l'effectif des élèves dans la salle
            return salle.eleves.length;
        },
        getSalleTotal(salle) {
            // Récupérer le total pour la salle (scolarité * effectif)

            return salle.scolarite * salle.eleves.length;
        },
        montantPaiements(eleve) {
            // Calculer le montant total des paiements de l'élève
            const paiements = this.payments.filter(p => p.mat === eleve.mat);
            return paiements.reduce((total, paiement) => total + paiement.valeur, 0);
        },
        getSalleTotalActuel(salle) {
            // Récupérer le total actuel pour la salle (somme des paiements des élèves)
            let totalActuel = 0;
            for (const eleve of salle.eleves) {
                totalActuel += this.montantPaiements(eleve)
            }
            return totalActuel;
        },
        getSalleReste(salle) {
            // Récupérer le reste pour la salle (différence entre le total et le total actuel)
            const total = this.getSalleTotal(salle);
            const totalActuel = this.getSalleTotalActuel(salle);
            return total - totalActuel;
        },
        generatePDF() {
            const docDefinition = {
                content: [
                    {
                        text: 'Rapport par classe',
                        style: 'header',
                    },
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            body: [
                                [
                                    { text: 'Salle', style: 'tableHeader' },
                                    { text: 'Effectif', style: 'tableHeader' },
                                    { text: 'Total', style: 'tableHeader' },
                                    { text: 'Total Actuel', style: 'tableHeader' },
                                    { text: 'Reste', style: 'tableHeader' },
                                ],
                                ...this.salles.map((salle) => [
                                    salle.name,
                                    this.getSalleEffectif(salle),
                                    this.getSalleTotal(salle) + "fcfa",
                                    this.getSalleTotalActuel(salle) + "fcfa",
                                    this.getSalleReste(salle) + "fcfa",
                                ]),
                            ],
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    table: {
                        margin: [0, 10, 0, 10],
                    },
                    tableHeader: {
                        bold: true,
                        fillColor: '#f4f4f4',
                    },
                },
            };

            pdfMake.createPdf(docDefinition).download('rapport_classe.pdf');
        },
    },

};
</script>



<style></style>