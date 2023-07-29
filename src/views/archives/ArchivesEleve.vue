<template>
    <div id="OneEleve" v-if="this.eleve">



        <div class="pagetitle">
            <h1>My school </h1>

        </div><!-- End Page Title -->

        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Informations Personnelles</h5>
                            <div>

                                <li>Nom: <h4>{{ this.eleve.nom }}</h4>
                                </li>
                                <li>Prénom:<h4> {{ this.eleve.prenom }} </h4>
                                </li>
                                <li>Âge: {{ this.eleve.age }}</li>
                                <li>Matricule: {{ this.eleve.mat }}</li>
                                <li>Classe:{{ this.eleve.className }}</li>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Frais Supplémentaires</h3>
                            <!-- Affichage de la liste des paiements -->
                            <div>
                                <eleve-paiement-vue :frais="true" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">Frais de Scolarité</h3>
                            <!-- Affichage de la liste des paiements -->
                            <div>
                                <archives-paiementeleve/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import ArchivesPaiementeleve from '../../components/ArchivesPaiementeleve.vue';

export default {
    name: 'InfosEleve',
    components: {
        ArchivesPaiementeleve
    },
    data() {

        return {
            
            listePayments: [],
            eleve: JSON.parse(sessionStorage.getItem('eleve')),
            frais: true,
            totalAmount: null,
            elevePayment: {},

           
        }

    },
    mounted() {
        if (!this.eleve) {
            this.$router.push('/archives'); // Redirige vers la page de connexion
        }
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
}</style>
