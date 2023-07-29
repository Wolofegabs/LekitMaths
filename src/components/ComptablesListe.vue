<template>
  <div class="comptable">
    <div class="col-md-12">
                        <button class="btn btn-primary" @click="showAddComptableForm">Ajouter un
                            comptable</button>
                        <!-- Formulaire d'ajout de paiement -->
                        <div v-if="showAddComptable">
                      <h2>Ajouter un Comptable</h2>
                      <form @submit.prevent="addComptable">
                        <div class="mb-3">
                          <label for="nom" class="form-label">Nom:</label>
                          <input v-model="newComptable.nom" type="text" class="form-control" id="nom" required>
                        </div>
                        <div class="mb-3">
                          <label for="prenom" class="form-label">Prénom:</label>
                          <input v-model="newComptable.prenom" type="text" class="form-control" id="prenom" required>
                        </div>
                        <div class="mb-3">
                          <label for="motDePasse" class="form-label">Mot de passe:</label>
                          <input v-model="newComptable.password" type="password" class="form-control" id="motDePasse" required>
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">Email:</label>
                          <input v-model="newComptable.email" type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                          <label for="tel" class="form-label">Numéro de téléphone:</label>
                          <input v-model="newComptable.tel" type="tel" class="form-control" id="tel" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                        <button class="btn btn-secondary ml-2" @click="showAddComptable = false">Annuler</button>
                      </form>
                    </div>
                    <div class="row mt-3">
                                                    <div class="col-md-12">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Identifiant</th>
                                                                    <th>Nom</th>
                                                                    <th>Prénom</th>
                                                                    <th>Email</th>
                                                                    <th>Tel</th>
                                                                    <th>Date</th>
                                                                   
                                                                </tr>
                                                            </thead>
                                                               <tbody  v-if="this.comptables.length > 0">
                                                                    <tr v-for="comptable in this.comptables" :key=" comptable.mat">
                                                                        <td>{{ comptable.mat }}</td>
                                                                        <td>{{ comptable.nom }}</td>
                                                                        <td>{{ comptable.prenom }}</td>
                                                                        <td>{{ comptable.email}}</td>
                                                                        <td>{{ comptable.tel }}</td>
                                                                        <td>{{ comptable.date }}</td>
                                                                    </tr>
                                                                </tbody>
                      
                                                        </table>
                                                    </div>
                                                </div>

                    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            showAddComptable: false,
            comptables: [],
            myschool: JSON.parse(localStorage.getItem("myschool")) || [],
            newComptable: {
                mat: null,
                nom: '',
                prenom: '',
                email: '',
                password: '',
                tel: '',
                date:'',
                
            },

        }
    },
    mounted() {
        this.chargerComptables()
      
    },
    methods: {
        //Pour ajouter un comptable
        addComptable() {
            // Le mat du nouveau comptable
            const lastcomptableId = this.comptables.length > 0 ? this.comptables[this.comptables.length - 1].mat : 0;
            const newComptableId = lastcomptableId + 1;
            // Créer le nouveau coomptable avec l'ID généré et les informations fournies
            const date = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const dateTimeString = date.toLocaleDateString('fr-FR', options);

            console.log(dateTimeString);
            const newComptable = {
                mat: newComptableId,
                nom: this.newComptable.nom,
                prenom: this.newComptable.prenom,
                email: this.newComptable.email,
                password: this.newComptable.password,
                tel: this.newComptable.tel,
                date: dateTimeString
            };
            this.ajouterComptable(newComptable);
            
        },
        //Methode pour assurer les vérifications avant enregistrement
        ajouterComptable(comptable) {
            // Vérifications pour le nom, le prénom, le mot de passe et l'email
            comptable.nom = comptable.nom.replace(/[^A-Za-z]/g, '');
            comptable.prenom = comptable.prenom.replace(/[^A-Za-z]/g, '');
            comptable.password = comptable.password.length >= 8 ? comptable.password : null;
            comptable.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comptable.email) ? comptable.email : null;
            comptable.tel =  comptable.tel[0]>3&& comptable.tel[0]<=9? comptable.tel.replace(/[^0-9]/g, '').slice(0, 8):null;

            // Vérification si les champs sont valides
            if (comptable.nom && comptable.prenom && comptable.password && comptable.email && comptable.tel) {
                this.comptables.push(comptable);
                this.sauvegarderComptables();
            } else {
                alert("Veuillez remplir tous les champs correctement.");
            }
        },//Fin de cette methode
         // Méthode pour afficher le formulaire d'ajout de paiement
        showAddComptableForm() {
            this.showAddComptable = true;
        },//Fin de methode pour afficher le formulaire d'ajout
        //Methode pour sauvegarder les comptables
        sauvegarderComptables() {
            this.myschool[this.myschool.length - 1].comptables = this.comptables;
            localStorage.setItem('myschool', JSON.stringify(this.myschool))
        },//Fin de cette methode 
        //Pour récuper les comptables
        chargerComptables() {
            // Vérifier s'il y a des objets promoScolaire dans myschool
            if (this.myschool && this.myschool.length > 0) {
                // Récupérer le dernier objet promoScolaire
                this.comptables = this.myschool[this.myschool.length - 1].comptables;
            } return this.comptables
        },
    },

}
</script>

<style>

</style>