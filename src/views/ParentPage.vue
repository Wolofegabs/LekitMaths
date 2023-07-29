<template>
    <div id="OneEleve" v-if="this.eleve">



        <div class="pagetitle">
            <h1>My school </h1>

        </div><!-- End Page Title -->

        <section class="section" >
            <div class="row info-eleve">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Informations Personnelles</h5>
                            <div>

                                <li>Nom: {{ this.eleve.nom }}</li>
                                <li>Prénom:{{ this.eleve.prenom }}</li>
                                <li>Âge: {{ this.eleve.age }}</li>
                                <li>Matricule: {{ this.eleve.mat }}</li>
                                <li>Classe:{{ this.eleve.classe }}</li>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Frais Supplémentaires</h5>
                            <!-- Affichage de la liste des paiements -->
                            <div>
                                <parent-paiement :frais="true" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Frais de Scolarité</h5>
                            <!-- Affichage de la liste des paiements -->
                            <div>
                                <parent-paiement/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import ParentPaiement from '../components/ParentPaiement.vue'

export default {
    name: 'InfosEleve',
    components: {
        ParentPaiement
    },
    data() {

        return {
            
            eleve: JSON.parse(sessionStorage.getItem('eleve')),
           
        }

    },
    mounted() {
         if (!this.eleve ) {
            this.$router.push('/'); // Redirige vers la page de connexion
        }
    },

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
