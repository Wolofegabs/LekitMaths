<template>
    <div id="ClassesPage" v-if="this.comptableActuelle">
        <div class="pagetitle">
            <h3>Archives</h3>

            <div class="">
                <form @submit.prevent="rechercherPromoScolaire" class="search-form d-flex align-items-center">
                    <input type="number" v-model="anneeRecherche"
                        placeholder="Entrez une année ">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div><!-- End Search Bar -->

        </div><!-- End Page Title -->

        <section class="one-classe">
            <div v-if="promoScolaireTrouve" @click="enregistrerPromoScolaire">Promotion:{{ promoScolaireTrouve.annee }}</div>
            <div v-if="!promoScolaireTrouve">{{ this.erreurAnnee }}</div>
            <div v-if="promoScolaireTrouve"  class="grid">
                <div class="col-4">
                    <div class=" col-12">
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/archives-classes">
                      <span>Scolarite</span>
                      <!--i class="fas fa-cog ms-auto"></i-->
                    </a>
                </li><!-- End Icons Nav -->
                    </div>
                    <div class=" col-12">
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/archives-impayesClasses">
                          <span>Impayés</span>
                          <!--i class="fas fa-cog ms-auto"></i-->
                        </a>
                    </li><!-- End Icons Nav -->
                    </div>
                    <div class=" col-12">
            <li class="nav-item">
              <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
              <span>Rapports financiers</span>
              </a>
              <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/archive-rapport-salle">
                   <span>Par classe</span>
                  </a>
                </li>
                <li>
                  <a href="/archives-rapport-classe">
                    <span>De la Promotion</span>
                  </a>
                </li>
              </ul>
            </li><!-- End Components Nav -->
                    </div>
                 
                  


                </div>
            </div>
        </section> 

    </div>
</template>

<script>

export default {
    name: 'ClassesList',

    data() {



        return {

            myschool: JSON.parse(localStorage.getItem("myschool")) || [],
             anneeRecherche: null,
            promoScolaireTrouve: null,
            currentPromoScolaire: null,
            erreurAnnee: '',
             comptableActuelle: JSON.parse(sessionStorage.getItem('comptableActuelle')),
            
        }
    },
    mounted() {
        if (!this.comptableActuelle) {
            this.$router.push('/adminForm'); // Redirige vers la page de connexion
        }
        console.log(this.myschool[this.myschool.length - 1].annee)
      
        const currentPromoScolaire = sessionStorage.getItem('currentPromoScolaire');
        if (currentPromoScolaire) {
            this.currentPromoScolaire = JSON.parse(currentPromoScolaire);
        }
       

    },

    methods: {
        rechercherPromoScolaire() {
            
            var annee = null;
            if (this.anneeRecherche < this.myschool[this.myschool.length - 1].annee) {
                annee = this.anneeRecherche;
            }
            
             const promoScolaire = this.myschool.find(p => p.annee === annee);
            if (promoScolaire) {
                this.promoScolaireTrouve = promoScolaire;
            } else if (! this.anneeExiste(annee)) {
                this.erreurAnnee = " L'année n'existe pas"
                this.anneeRecherche= ''
                
            } else if (!this.validerAnnee) {
                this.erreurAnnee = " Veuillez entrer une année valide"
                 this.anneeRecherche = ''
            }else {
                this.erreurAnnee = "Aucune promotion scolaire trouvée dans les archives pour l'année spécifiée.";
                this.promoScolaireTrouve = null;
                 this.anneeRecherche = ''
            }
        },
        
            anneeExiste(annee) {
            return this.myschool.some(promoScolaire => promoScolaire.annee === annee);
        },

        validerAnnee(annee) {
            // Vérifier s'il existe d'archive
            if (this.myschool.lenght > 1) {
                            // Vérifier si l'année est un nombre entier
                if (!/^\d+$/.test(annee)) {
                    return false;
                }

                // Vérifier si l'année est supérieure à 1900 et inférieure à l'année du dernier promoScolaire de myschool
                const anneeMin = 1900;
                const anneeMax = this.myschool[this.myschool.length - 1].annee;

                if (annee < anneeMin || annee > anneeMax) {
                    return false;
                }

                return true;
            } else {
                return false
            }
        }, 
        enregistrerPromoScolaire() {
            sessionStorage.setItem('currentPromoScolaire', JSON.stringify(this.promoScolaireTrouve));
            this.currentPromoScolaire = this.promoScolaireTrouve;
        }
    },




};
</script>

<style lang="scss">
#ClassesPage {
    .pagetitle {
        .search-bar {
            min-width: 360px;
            padding: 0 20px;
        }

        @media (max-width: 1199px) {
            .search-bar {
                position: fixed;
                top: 50px;
                left: 0;
                right: 0;
                padding: 20px;
                box-shadow: 0px 0px 15px 0px rgba(1, 41, 112, 0.1);
                background: white;
                z-index: 9999;
                transition: 0.3s;
              
                opacity: 0;
            }

            .search-bar-show {
                top: 60px;
                visibility: visible;
                opacity: 1;
            }
        }

        .search-form {
            width: 100%;
        }

        .search-form input {
            border: 0;
            font-size: 14px;
            color: #012970;
            border: 1px solid rgba(1, 41, 112, 0.2);
            padding: 7px 38px 7px 8px;
            border-radius: 3px;
            transition: 0.3s;
            width: 100%;
        }

        .search-form input:focus,
        .search-form input:hover {
            outline: none;
            box-shadow: 0 0 10px 0 rgba(1, 41, 112, 0.15);
            border: 1px solid rgba(1, 41, 112, 0.3);
        }

        .search-form button {
            border: 0;
            padding: 0;
            margin-left: -30px;
            background: none;
        }

        .search-form button i {
            color: #012970;
        }

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

        .classe:hover {
            background: rgb(255, 255, 255);
            color: #4154f1;
        }


    }
}
</style>
