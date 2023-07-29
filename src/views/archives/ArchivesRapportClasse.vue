<!-- classe-report.vue -->
<template>
    <div v-if="this.currentPromoScolaire">
        <h2>Rapport par classe</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Classe</th>
                    <th>Effectif Total</th>
                    <th>Total</th>
                    <th>Total Actuel</th>
                    <th>Reste</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="classe in this.classes" :key="classe.id">
                    <td>{{ classe.title }}</td>
                    <td>{{ getEffectifTotal(classe) }}</td>
                    <td>{{ getTotal(classe) }} fcfa</td>
                    <td>{{ getTotalActuelC(classe) }} fcfa</td>
                    <td>{{ getResteC(classe) }} fcfa</td>
                </tr>
            </tbody>
        </table>
        <div class=" row col-lg-12">
            <h4>Bilan</h4>
        </div>
        <div class="row col-lg-12">
            <span class="col-lg-4">Total: {{ getTotalP() }} fcfa</span>
            <span class="col-lg-4">TotalActuel:{{ getTotalActuelP() }} fcfa</span>
            <span class="col-lg-4">Reste:{{ getResteP() }} fcfa</span>

        </div>
        <button class="btn btn-primary" @click="generatePDF">Télécharger le rapport</button>
    </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
    data() {
        return {
            classes: [], // Données récupérées depuis le local storage
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
        this.recupererClasses()
    },
    methods: {
        recupererPromotions() {
            // Vérifier s'il y a des objets promoScolaire dans myschool
            if (this.myschool && this.myschool.length > 0) {
                // Récupérer le dernier objet promoScolaire
                this.promotions = this.currentPromoScolaire.promotions;
                this.payments = this.currentPromoScolaire.payments;
            }
        },
        recupererClasses() {

            for (const classe of this.promotions) {
                this.classes.push(classe)
            }
        },
        getEffectifTotal(classe) {
            // Calculer l'effectif total pour une classe spécifique
            let effectifTotal = 0;
            classe.salles.forEach((salle) => {
                effectifTotal += salle.eleves.length;
            });
            return effectifTotal;
        },
        getTotal(classe) {
            // Calculer le total pour une classe spécifique
            let total = 0;
            classe.salles.forEach((salle) => {
                total += salle.eleves.length * classe.scolarite;
            });
            return total;
        },
        montantPaiements(eleve) {
            // Calculer le montant total des paiements de l'élève
            const paiements = this.payments.filter(p => p.mat === eleve.mat);
            return paiements.reduce((total, paiement) => total + paiement.valeur, 0);
        },
        getTotalActuelC(classe) {
            // Calculer le total actuel pour une classe spécifique
            let totalActuelC = 0;
            for (const salle of classe.salles) {
                for (const eleve of salle.eleves) {
                    totalActuelC += this.montantPaiements(eleve)
                }
            }
            return totalActuelC;
        },
        getResteC(classe) {
            // Calculer le reste pour une classe spécifique
            const totalC = this.getTotal(classe);
            const totalActuelC = this.getTotalActuelC(classe);
            return totalC - totalActuelC;
        },
        getTotalP() {
            // Calculer le totalP (somme de tous les totalC par classe)
            let totalP = 0;
            for (const classe of this.promotions) {
                totalP += this.getTotal(classe);
            }
            return totalP;
        },
        getTotalActuelP() {
            // Calculer le totalActuelP (somme de tous les totalActuelC par classe)
            let totalActuelP = 0;
            this.promotions.forEach((classe) => {
                totalActuelP += this.getTotalActuelC(classe);
            });
            return totalActuelP;
        },
        getResteP() {
            // Calculer le resteP (différence entre totalP et totalActuelP)
            const totalP = this.getTotalP();
            const totalActuelP = this.getTotalActuelP();
            return totalP - totalActuelP;
        },
        generatePDF() {
            const docDefinition = {
                content: [
                    {
                        text: 'Rapport de Promotion ',
                        style: 'header',
                    },
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            body: [
                                [
                                    { text: 'Classe', style: 'tableHeader' },
                                    { text: 'Effectif', style: 'tableHeader' },
                                    { text: 'Total', style: 'tableHeader' },
                                    { text: 'Total Actuel', style: 'tableHeader' },
                                    { text: 'Reste', style: 'tableHeader' },
                                ],
                                ...this.classes.map((classe) => [
                                    classe.title,
                                    this.getEffectifTotal(classe),
                                    this.getTotal(classe) + "fcfa",
                                    this.getTotalActuelC(classe) + "fcfa",
                                    this.getResteC(classe) + "fcfa",
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

            pdfMake.createPdf(docDefinition).download('rapport_promotion.pdf');
        },
    },

};
</script>


<style></style>