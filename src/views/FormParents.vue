<template>
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Connexion Parent</h5>

                      <!-- Vertical Form -->
                      <form class="row g-3" @submit.prevent="submitForm">
                        <div class="col-12">
                          <label for="nom" class="form-label">Nom</label>
                          <input type="text" class="form-control" id="nom" v-model="nom" required>
                        </div>
                        <div class="col-12">
                          <label for="prenom" class="form-label">Prénom</label>
                          <input type="text" class="form-control" id="prenom" v-model="prenom" required>
                        </div>
                        <div class="col-12">
                          <label for="phone" class="form-label">Téléphone</label>
                          <input type="number" class="form-control" id="phone" v-model="num" required>
                        </div>

                        <div class="text-center">
                          <button type="submit" class="btn btn-primary">Connexion</button>
                     
                        </div>
                      </form><!-- Vertical Form -->
                       <p v-if="messageErreur">{{ messageErreur }}</p>
                       
                    </div>
                  </div>
                </div>

</template>

<script>

export default {
    data() {
        return {
            myschool: JSON.parse(localStorage.getItem("myschool")) || [],
            nom: '',
            prenom: '',
            num: null,
            mesEnfants:[],//liste des enfants du parents
            eleves: [],
            messageErreur: '',
           
        }
  }, 
 
    methods: {
        submitForm() {
            // Effectuez la recherche des élèves du parent
            const mesEnfants = this.searchEleves();
            console.log(mesEnfants)
             this.saveMesEnfants(mesEnfants);

            // Vérifiez si le parent a des enfants
            if (mesEnfants.length > 0) {
                // Redirigez le parent vers la page de la liste des enfants
              
                const url = `/child-liste`;

                this.$router.push(url);
                
            } else {
                // Le parent n'a pas d'enfant, affichez un message d'erreur
                this.messageErreur = "Aucun enfant trouvé pour ce parent";
            }
        },
        searchEleves() {
        
                const promo = this.myschool[this.myschool.length - 1].promotions;
                const parentInfo = {
                    nom: this.nom,
                    prenom: this.prenom,
                    num: this.num,
                };
                console.log(promo)
                const mesEnfants = [];

                for (const classe of promo) {
                    for (const salle of classe.salles) {
                        for (const eleve of salle.eleves) {
                            const { nomParent, prenomParent, numParent } = eleve;

                            if (
                                nomParent === parentInfo.nom &&
                                prenomParent === parentInfo.prenom &&
                                numParent === parentInfo.num

                            ) {

                                const elevesWithClasse = {
                                    ...eleve,
                                    classe: salle.name,
                                    classeId: salle.id,
                                    scolarite: classe.scolarite
                                };
                                mesEnfants.push(elevesWithClasse);

                            }
                        }
                    }
                }
                return mesEnfants;
            
        },
                // Pour enregistrer les enfants dans le local storage
        saveMesEnfants( mesEnfants) {
            if(mesEnfants.length>0)
             sessionStorage.setItem('mesEnfants', JSON.stringify(mesEnfants)) ;
        },
    }
}
</script>


<style>

</style>