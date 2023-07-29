<template>
    <div class="col-lg-6 container-fluid my-4" id="formulaire">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"> Admin Connexion</h5>

                <!-- Vertical Form -->
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="nom" class="form-label">Nom:</label>
                        <input v-model="nom" type="text" class="form-control" id="nom" required>
                    </div>
                   
                    <div class="mb-3">
                        <label for="motDePasse" class="form-label">Mot de passe:</label>
                        <input v-model="password" type="password" class="form-control" id="motDePasse" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="tel" class="form-label">Numéro de téléphone:</label>
                        <input v-model="tel" type="tel" class="form-control" id="tel" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Connexion</button>

                </form><!-- Vertical Form -->
                <p v-if="messageErreur != ''">{{ messageErreur }}</p>

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
            password: '',
            tel: null,
            adminActuelle: null,//liste des enfants du parents
            eleves: [],
            messageErreur: '',

        }
    },

    methods: {

        submitForm() {
            // Effectuez la recherche des élèves du parent
            const adminActuelle = this.searchAdmin();
            console.log(adminActuelle)
            this.saveAdminActuelle(adminActuelle);
            if (this.adminActuelle != null) {
                this.$router.push('/adminHome'); // Redirige vers la page d'accueil
            }

        },
        //Pour rechercher le comptable
        searchAdmin() {

            const promo = this.myschool[this.myschool.length - 1].admin;
            const admin = {
                nom: this.nom,
                password: this.password,
                tel: this.tel,
            };
            const adminInfo = this.security(admin);
            console.log(promo)

            var adminActuelle = null
            
            if (
                promo.nom === adminInfo.nom &&
                promo.password === adminInfo.password &&
                promo.num === adminInfo.tel

            ) {
                adminActuelle = promo;
            } else {
                this.messageErreur = "Attention!! Données incorectes."
            }
            return adminActuelle;

        },
        //Methode pour assurer les vérifications avant enregistrement
        security(admin) {
            // Vérifications pour le nom, le prénom, le mot de passe et l'email
            admin.nom = admin.nom.replace(/[^A-Za-z]/g, '');
            admin.password = admin.password.length >= 8 ? admin.password : null;
            admin.tel = admin.tel[0] > 3 && admin.tel[0] <= 9 ? admin.tel.replace(/[^0-9]/g, '').slice(0, 8) : null;

            // Vérification si les champs sont valides
            if (admin.nom && admin.password && admin.tel) {
                return admin
            } else {
                this.messageErreur = "Veuillez remplir tous les champs correctement.";
            }
        },//Fin de cette methode
        // Pour enregistrer les comptables dans le local storage
        saveAdminActuelle(adminActuelle) {
            if (adminActuelle)
                sessionStorage.setItem('adminActuelle', JSON.stringify(adminActuelle));
            this.adminActuelle = adminActuelle;
        },
    }
}
</script>


<style lang="scss">
#formulaire {
    h5 {
        color: #4154f1;
    }
}
</style>