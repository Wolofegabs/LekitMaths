<template>
                <div class="col-lg-6 container-fluid my-4" id="formulaire">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Connexion Comptable</h5>

                      <!-- Vertical Form -->
                      <form @submit.prevent="submitForm">
                          <div class="mb-3">
                            <label for="nom" class="form-label">Nom:</label>
                            <input v-model="nom" type="text" class="form-control" id="nom" required>
                          </div>
                          <div class="mb-3">
                            <label for="prenom" class="form-label">Prénom:</label>
                            <input v-model="prenom" type="text" class="form-control" id="prenom" required>
                          </div>
                          <div class="mb-3">
                            <label for="motDePasse" class="form-label">Mot de passe:</label>
                            <input v-model="password" type="password" class="form-control" id="motDePasse" required>
                          </div>
                          <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input v-model="email" type="email" class="form-control" id="email" required>
                          </div>
                          <div class="mb-3">
                            <label for="tel" class="form-label">Numéro de téléphone:</label>
                            <input v-model="tel" type="tel" class="form-control" id="tel" required>
                          </div>
                          <button type="submit" class="btn btn-primary">Connexion</button>
                          
                        </form><!-- Vertical Form -->
                       <p v-if="messageErreur !=''">{{ messageErreur }}</p>
                       
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
          email: '',
            password:'',
            tel: null,
            comptableActuelle:null,//liste des enfants du parents
            eleves: [],
            messageErreur: '',
           
        }
  },
 
  methods: {
   
        submitForm() {
            // Effectuez la recherche des élèves du parent
            const comptableActuelle = this.searchComptable();
            console.log(comptableActuelle)
          this.saveComptableActuelle(comptableActuelle);
             if (this.comptableActuelle != null) {
        this.$router.push('/admin'); // Redirige vers la page d'accueil
      }

    },
        //Pour rechercher le comptable
        searchComptable() {
        
                const promo = this.myschool[this.myschool.length - 1].comptables;
                const comptable= {
                    nom: this.nom,
                  prenom: this.prenom,
                  email: this.email,
                  password: this.password,
                    tel: this.tel,
          };
        const comptableInfo = this.security(comptable);
                console.log(promo)
                
      var comptableActuelle=null
               for (const person of promo) {
        console.log(person)

        if (
          person.nom === comptableInfo.nom &&
          person.prenom === comptableInfo.prenom &&
          person.email === comptableInfo.email &&
          person.password === comptableInfo.password &&
          person.tel===comptableInfo.tel

        ) {
           comptableActuelle = person;
        } else {
          this.messageErreur= "Attention!! Données incorectes."
        }
      }
                return comptableActuelle;
            
      },
        //Methode pour assurer les vérifications avant enregistrement
    security(comptable) {
      // Vérifications pour le nom, le prénom, le mot de passe et l'email
      comptable.nom = comptable.nom.replace(/[^A-Za-z]/g, '');
      comptable.prenom = comptable.prenom.replace(/[^A-Za-z]/g, '');
      comptable.password = comptable.password.length >= 8 ? comptable.password : null;
      comptable.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comptable.email) ? comptable.email : null;
      comptable.tel = comptable.tel[0] > 3 && comptable.tel[0] <= 9 ? comptable.tel.replace(/[^0-9]/g, '').slice(0, 8) : null;

      // Vérification si les champs sont valides
      if (comptable.nom && comptable.prenom && comptable.password && comptable.email && comptable.tel) {
        return comptable
      } else {
        this.messageErreur= "Veuillez remplir tous les champs correctement.";
      }
    },//Fin de cette methode
                // Pour enregistrer les comptables dans le local storage
        saveComptableActuelle( comptableActuelle) {
            if(comptableActuelle)
            sessionStorage.setItem('comptableActuelle', JSON.stringify(comptableActuelle));
          this.comptableActuelle = comptableActuelle;
        },
    }
}
</script>


<style lang="scss">
#formulaire{
  h5{
   color: #4154f1;
}
}

</style>