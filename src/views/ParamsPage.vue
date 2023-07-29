<template>
  <div id="promo">
    <h4>Gestion des Promotions</h4>
                <section class="one-classe">
                <div class="row">
                  <div class="col-lg-12">

                          <div class="card" v-for="(promoScolaire, index) in myschool" :key="index" @click="setCurrentPromoScolaire()">
                        <div class="card-body">
                         <div class="row col-lg-12">
                           <h5 class="card-title col-lg-7"> Promotion: {{ promoScolaire.annee }}</h5>
                            <h5 class="card-title col-lg-5"> Crée le : {{ promoScolaire.creation }}</h5>
                         </div>
                  
                          <table class="table datatable">
                            <thead>
                              <tr class="classe" >
                                <th scope="col">Classes</th>
                     
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="classe" v-for="(promo, index) in myschool[myschool.length - 1].promotions" :key="index">
                                <td scope="row"> {{ promo.title }} </td>
                               
                              </tr>
                            </tbody>
                          </table>
                 
                          <button class="btn btn-danger" @click="supprimerPromoScolaire(promoScolaire)">Supprimer</button>
                        </div>
                                  <div class="card">
              <div class="card-body" v-if="showForms">
                

                <!-- Multi Columns Form -->
                <form class="row g-3" v-for="(promo, index) in myschool[myschool.length - 1].promotions" :key="index"
              @submit.prevent="ajouterValeurs(promo)">
              <h5 class="card-title">{{ promo.title }}</h5>
                  <div class="col-md-12">
                    <label for="scolarite" class="form-label">Scolarité</label>
                    <input type="number" class="form-control" id="scolarite" v-model="promo.scolarite" placeholder="Scolarité" required>
                  </div>
                  <div class="col-md-6">
                    <label for="inputT1" class="form-label">Tranche 1</label>
                      <input type="number" class="form-control" id="inputT1" v-model="promo.tranches[0].pourcentage" placeholder="Pourcentage tranche 1" required >
                  </div>
                  <div class="col-md-6">
                    <label for="inputD1" class="form-label">Date 1</label>
                    <input type="date" class="form-control" id="inputD1" placeholder="Délai de paiement" v-model="promo.tranches[0].date" required>
                  </div>
                    <div class="col-md-6">
                      <label for="inputT2" class="form-label">Tranche 2</label>
                        <input type="number" class="form-control" id="inputT2" v-model="promo.tranches[1].pourcentage" placeholder="Pourcentage tranche 2" required>
                    </div>
                    <div class="col-md-6">
                      <label for="inputD2" class="form-label">Date 2</label>
                      <input type="date" class="form-control" id="inputD2" placeholder="Délai de paiement" v-model="promo.tranches[1].date" required>
                    </div>
                    <div class="col-md-6">
                      <label for="inputT3" class="form-label">Tranche 3</label>
                        <input type="number" class="form-control" id="inputT3" v-model="promo.tranches[2].pourcentage" placeholder="Pourcentage tranche 3" required>
                    </div>
                    <div class="col-md-6">
                      <label for="inputD3" class="form-label">Date 3</label>
                      <input type="date" class="form-control" id="inputD3" placeholder="Délai de paiement" v-model="promo.tranches[2].date" required>
                    </div>
                      
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                    <button type="reset" class="btn btn-secondary">Annuler</button>
                  </div>
                  <p v-if="erreurTranches && !thankYouMessage">{{ erreurTranches }}</p>
                  <p v-if="thankYouMessage">{{ thankYouMessage }}</p>
                </form><!-- End Multi Columns Form -->
                
              </div>
            </div>
          </div>
       </div>
              <div class="col-lg-12 my-3" >
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Nouvelle Promotion</h4>

                        <!-- Vertical Form -->
                        <form class="row g-3" @submit.prevent="ajouterPromoScolaire">
                       
                          
                          <div class="col-12">
                            <label for="annee" class="form-label">Année</label>
                            <input type="number" class="form-control" id="annee" v-model="nouvelleAnnee" placeholder="Année" required>
                          </div>

                          <div class="text-center">
                            <button type="submit" class="btn btn-primary">Ajouter</button>
                     
                          </div>
                        </form><!-- Vertical Form -->
                         <p v-if="erreurAnnee" class="error">{{ erreurAnnee }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  </div>
</template>

<script>
import data from '/classesData.js'

export default {
  data() {
    return {
      myschool: [],
      nouvelleAnnee: null,
      erreurTranches:'',
      erreurAnnee: '',// Quand il y a erreur sur l'année
      showForms: false,
      thankYouMessage: '',
      username: 'root',
      adminPassword:'root'
      
    };
  },
  mounted() {
   
    this.recupererPromoScolaires();
  
    console.log(this.myschool[this.myschool.length - 1])
  },
  methods: {
    recupererPromoScolaires() {
      const dataLocalStorage = JSON.parse(localStorage.getItem('myschool'));
      if (dataLocalStorage) {
        this.myschool = dataLocalStorage;
        this.sauvegarderDonnees()
      }
    },
    setCurrentPromoScolaire() {
   
      this.showForms = true;
      this.thankYouMessage = '';
    },

    ajouterPromoScolaire() {
      
      const annee = this.nouvelleAnnee;
      if (!isNaN(annee)) {
        if (this.anneeExisteDeja(annee)) {
          this.erreurAnnee = "L'année existe déjà.";
        } else if (!this.anneeEstValide(annee)) {
          this.erreurAnnee = "Veuillez entrer une année valide.";
        } else {
          const promoScolaire = {
            admin:{"username":"root","password":"root","num":97000000},
            annee: annee,
            promotions: JSON.parse(JSON.stringify(data)), // Copie profonde des données de data.js
            payments: [],
            supplementaires: [],
            comptables:[],
            creation: new Date().toLocaleString() // Ajout de la date et heure de création
          };

          this.myschool.push(promoScolaire);
         this.sauvegarderDonnees();
   
          this.nouvelleAnnee = '';
          this.erreurAnnee = '';
        }
      } else {
        this.erreurAnnee = "Veuillez entrer une année valide.";
      }
    },

    ajouterValeurs(promo) {
      // Vérifier si les valeurs sont valides 
      if (promo.scolarite && promo.tranches.length === 3 && typeof promo.scolarite === "number" && Number.isInteger(promo.scolarite) && promo.scolarite > 0 && promo.scolarite % 5 === 0 &&
        typeof promo.tranches[0].pourcentage === "number" && Number.isInteger(promo.tranches[0].pourcentage) && promo.tranches[0].pourcentage > 0 &&
        typeof promo.tranches[1].pourcentage === "number" && Number.isInteger(promo.tranches[1].pourcentage) && promo.tranches[1].pourcentage > 0 &&
     typeof promo.tranches[2].pourcentage === "number" && Number.isInteger(promo.tranches[2].pourcentage) && promo.tranches[2].pourcentage > 0) {
        const pourcentageTranche1 = parseFloat(promo.tranches[0].pourcentage);
        const pourcentageTranche2 = parseFloat(promo.tranches[1].pourcentage);
        const pourcentageTranche3 = parseFloat(promo.tranches[2].pourcentage);

        // Vérifier si les pourcentages sont valides 
        if (
          !isNaN(pourcentageTranche1) &&
          !isNaN(pourcentageTranche2) &&
          !isNaN(pourcentageTranche3) &&
          (pourcentageTranche1 < pourcentageTranche2 < pourcentageTranche3) &&
          pourcentageTranche3 === 100 ) {
          // Enregistrer les valeurs dans l'objet promotion correspondant
          promo.tranches[0].pourcentage = pourcentageTranche1;
          promo.tranches[1].pourcentage = pourcentageTranche2;
          promo.tranches[2].pourcentage = pourcentageTranche3;

  

          // Mettre à jour la valeur "reste" pour chaque élève dans le promoScolaire courant
              // Décomposition des objets élèves et ajout de l'attribut `reste`
              // Vérifier si le paramètre promoScolaire est défini
          if (this.myschool.length>1) {
            // Parcourir les promotions
                 for (const classe of this.myschool[this.myschool.length - 1].promotions) {
              for (const salle of classe.salles) {
                for (var eleve of salle.eleves) {

                     for (const classe of this.myschool[this.myschool.length - 2].promotions) {
                      for (const salle of classe.salles) {
                        for (const eleveP of salle.eleves) {
                          if (eleveP.mat === eleve.mat) {
                           
                            eleve.arriere = eleveP.reste;
                          // Enregistrer les modifications dans le local storage
                          this.sauvegarderDonnees();
                           
           
                          }
                          

                     
                        }
                      }
                    }
                  

                
                }
              }
            }

             // Enregistrer les modifications dans le local storage
            this.sauvegarderDonnees();
          }

       
 

         
          this.sauvegarderDonnees();
          // Réinitialiser les formulaires
          this.thankYouMessage = "Merci d'avoir enregistré les valeurs.";
        } else {
          this.erreurTranches=" Données incohérentes."
        }
      }
    },
    sauvegarderDonnees() {
      localStorage.setItem('myschool', JSON.stringify(this.myschool));
      
     
    },

    anneeExisteDeja(annee) {
      return this.myschool.some(promoScolaire => promoScolaire.annee === annee);
    },
    anneeEstValide(annee) {
      var anneeActuelle = null
      if (this.myschool.length > 0) {
         annee > this.myschool[this.myschool.length - 1].annee ? anneeActuelle = new Date().getFullYear() : anneeActuelle
      } else {
        anneeActuelle = new Date().getFullYear();
      }
     
      return annee > 1900 && annee <= anneeActuelle;
    },
    supprimerPromoScolaire(promoScolaire) {
      const index = this.myschool.indexOf(promoScolaire);
      if (index !== -1) {
        alert("Voulez-vous vraiment supprimer la promotion "+promoScolaire.annee+" ?")
         this.myschool.splice(index, 1);
        this.sauvegarderDonnees();
  
      }
    }


  },
};
</script>

<style lang="scss">
#promo{
  h4{
   color: #4154f1;
}
}

</style>
