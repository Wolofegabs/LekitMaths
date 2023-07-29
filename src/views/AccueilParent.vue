<template>
    <div id="ParentLoginPage">
        <div v-if="!voirEleves">
            <h1>Connexion Parent</h1>
            <form @submit.prevent="searchEleves">
                <div>
                    <label for="nom">Nom:</label>
                    <input type="text" v-model="nom" required>
                </div>
                <div>
                    <label for="prenom">Prénom:</label>
                    <input type="text" v-model="prenom" required>
                </div>
                <div>
                    <label for="num">Numéro:</label>
                    <input type="number" v-model="num" required>
                </div>
                <button type="submit">Connexion</button>
            </form>
        </div>

        <div v-else>
           
                <section class="one-classe">
                  <div class="row">
                    <div class="col-lg-12">

                            <div class="card">
                          <div class="card-body">
                            <h1 class="card-title">Mes Enfants</h1>
                  
                            <table class="table datatable">
                              <thead>
                                <tr class="classe" >
                                  <th scope="col">Nom</th>
                                  <th scope="col">Prénom</th>
                                  <th scope="col">Classe</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="classe" v-for="eleve in eleves" :key="eleve.mat" @click="goToEleveInfos(eleve)">
                                  <td scope="row">{{ eleve.nom }}</td>
                                  <td>{{ eleve.prenom }}</td>
                                  <td>{{ eleve.classe }}</td>
                                </tr>
                              </tbody>
                            </table>
                 

                          </div>
                        </div>


                    </div>
                  </div>
                </section>
        </div>

        <div v-if="messageErreur">
            <p>Aucun élève trouvé avec les informations fournies.</p>
        </div>
    </div>
</template>

<script>


export default {
    name: 'ParentLoginPage',

    data() {
        return {
            nom: '',
            prenom: '',
            num: null,
            voirEleves: false,
            eleves: [],
            messageErreur: false,
            myschool: JSON.parse(localStorage.getItem("myschool")) || [],
            
            
            promo: []
        };
    },
    mounted() {
        this.recupererDernierPromo()
    },
    methods: {
        recupererDernierPromo() {
            // Vérifier s'il y a des objets promoScolaire dans myschool
            if (this.myschool && this.myschool.length > 0) {
                // Récupérer le dernier objet promoScolaire
                this.promo = this.myschool[this.myschool.length - 1].promotions;
            } return this.promo
        },
        searchEleves() {
            const parentInfo = {
                nom: this.nom,
                prenom: this.prenom,
                num: this.num,
            };

            const mesEnfants = [];

            for (const classe of this.recupererDernierPromo()) {
                for (const eleve of classe.eleves) {
                    const { nomParent, prenomParent, numParent } = eleve;

                    if (
                        nomParent === parentInfo.nom &&
                        prenomParent === parentInfo.prenom &&
                        numParent === parentInfo.num
                    ) {
                        const elevesWithClasse = {
                            ...eleve,
                            classe: classe.name,
                        };
                        mesEnfants.push(elevesWithClasse);
                    }
                }
            }

            if (mesEnfants.length > 0) {
                this.eleves = mesEnfants;
                this.voirEleves = true;
                this.messageErreur = false;
            } else {
                this.voirEleves = false;
                this.messageErreur = true;
            }
        },
    },
};
</script>

<style>
/* Styles go here */
</style>
