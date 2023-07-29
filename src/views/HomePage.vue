<template>
  <div id="HomePage" v-if="this.comptableActuelle">
    <div class="school">
		
			<h2>My school</h2>
		
		<p>
			Aujourd'hui c'est le <br>
			<span id="dateElement"></span>
		</p>
	</div>
    <section class="section dashboard">
      <div class="row">

        <!-- Left side columns -->
        <div class="col-lg-8">
          <div class="row">

            <!-- Sales Card -->
            <div class="col-xxl-4 col-md-6" id="Personnel_Card">
              <div class="card info-card sales-card">

                <div class="card-body">
                  <h5 class="card-title">TVA Annuelle</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <div class="ps-3">
                      <h6>{{ this.tvaAnnuelle }}fcfa</h6>
                      

                    </div>
                  </div>
                </div>

              </div>
            </div><!-- End Sales Card -->

            <!-- Revenue Card -->
            <div class="col-xxl-4 col-md-6" id="Enseignant_Card">
              <div class="card info-card revenue-card">

                <div class="card-body">
                  <h5 class="card-title">TVA Actuelle</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fas fa-money-bill"></i>
                    </div>
                    <div class="ps-3">
                      <h6>{{ this.tvaActuelle }}fcfa</h6>
                     

                    </div>
                  </div>
                </div>

              </div>
            </div><!-- End Revenue Card -->

            <!-- Customers Card -->
            <div class="col-xxl-4 col-xl-12" id="Eleve_Card">

              <div class="card info-card customers-card">

                <div class="card-body" >
                  <h5 class="card-title">Effectif Elèves</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="fas fa-users"></i>
                    </div>
                    <div class="ps-3">
                      <h6>{{ this.filteredStudents.length }} elèves</h6>
                      
                    </div>
                  </div>

                </div>
              </div>

            </div><!-- End Customers Card -->
          </div>
        </div><!-- End Left side columns -->
                <!-- Right side columns -->
          <div class="col-lg-4">

            <!-- Recent Activity -->
            <div class="card">


              <div class="card-body">
                <h5 class="card-title">Bilan  Scolarité</h5>

                <div class="activity">
              <!-- Customers Card -->
              <div class="col-xxl-4 col-xl-12">

                <div class="card info-card customers-card">

                  <div class="card-body">
                    <h5 class="card-title">Bilan  Actuel</h5>

                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="financial-icon current-icon fas fa-chart-line"></i>
                      </div>
                      <div class="ps-3">
                        <h6>{{ this.getTVAP() }}fcfa</h6>
                       

                      </div>
                    </div>

                  </div>
                </div>

              </div><!-- End Customers Card -->
                          <!-- Customers Card -->
              <div class="col-xxl-4 col-xl-12">

                <div class="card info-card customers-card">

                  <div class="card-body">
                    <h5 class="card-title">Bilan Annuel</h5>

                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="financial-icon total-icon fas fa-chart-pie"></i>
                      </div>
                      <div class="ps-3">
                        <h6>{{ this.getTotalP() }}fcfa</h6>
                        

                      </div>
                    </div>

                  </div>
                </div>

              </div><!-- End Customers Card -->
                </div>

              </div>
            </div><!-- End Recent Activity -->

          </div><!-- End Right side columns -->
      </div>
    </section>




  </div>
</template>

<script>


export default {
	name: 'HomePage',

  data() {
    
   

    return {
    
      
     
      classes: [], // Données récupérées depuis le local storage
      myschool: JSON.parse(localStorage.getItem("myschool")) || [],
      tvaActuelle:null,
      tvaAnnuelle:null,
      payments: [],
      filteredStudents: [],
      promo: [],
      comptableActuelle: JSON.parse(sessionStorage.getItem('comptableActuelle')),

		}
  },
    mounted() {
      if (!this.comptableActuelle) {
        this.$router.push('/adminForm'); // Redirige vers la page de connexion
      }
      
    console.log(this.myschool[this.myschool.length - 1].promotions)
    this.filterStudents()
      this.recupererDernierPromo()
      this.dateActuelle()
     
    setInterval(this.dateActuelle, 1000);

  },
 
      methods: {
    recupererDernierPromo() {
      // Vérifier s'il y a des objets promoScolaire dans myschool
      if (this.myschool && this.myschool.length > 0) {
        // Récupérer le dernier objet promoScolaire
        this.promo = this.myschool[this.myschool.length - 1].promotions;
        this.payments = this.myschool[this.myschool.length - 1].payments;
      } return this.promo
    },
    dateActuelle() {
  var dateElement = document.getElementById('dateElement'); // Élément HTML où afficher la date

  function actualiserDate() {
    var date = new Date();
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    var currentDateTime = date.toLocaleString('fr-FR', options);
    dateElement.textContent = currentDateTime;
  }

  // Appeler actualiserDate toutes les secondes
  setInterval(actualiserDate, 1000);
},

    filterStudents() {

      this.filteredStudents = [];

      for (const classe of this.recupererDernierPromo()) {
        for (const salle of classe.salles) {
          for (const eleve of salle.eleves) {

            this.filteredStudents.push(eleve);
          }
        }
      }
        },
    getTVAP() {
      // Calculer le totalP 
       
      let totalP = 0;
      for (const payment of this.payments) {
        totalP += payment.valeur;
      }
      this.tvaActuelle = (totalP * 18) / 100;
      return totalP;
        },
     getTotal(classe) {
      // Calculer le total pour une classe spécifique
      let total = 0;
      classe.salles.forEach((salle) => {
        total += salle.eleves.length * classe.scolarite;
      });
      return total;
        },
    getTotalP() {
      // Calculer le totalP (somme de tous les totalC par classe)
      let totalP = 0;
      for (const classe of this.promo) {
        totalP += this.getTotal(classe);
      }
      this.tvaAnnuelle = (totalP * 18) / 100;
      return totalP;
    },



  }





}
</script>

<style lang="scss">
#HomePage{
	font-family: Georgia, 'Times New Roman', Times, serif;
	/*--------------------------------------------------------------
# Dashboard
--------------------------------------------------------------*/


/* Info Cards */
.dashboard .info-card {
  padding-bottom: 10px;
  margin-bottom: 5px;
background-color: rgb(255, 255, 255);
border-radius: 10px;
box-shadow :rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
box-sizing: border-box;
color: rgb(3, 30, 35);
}
#Personnel_Card,#Enseignant_Card,#Eleve_Card{
  margin-bottom: 30px;
  
}
.dashboard .card-title{
  color: #4154f1;
}

.dashboard .info-card h6 {
  
 
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: #012970;
  font-family: Georgia, 'Times New Roman', Times, serif;
  border: none;
}

.dashboard .card-icon {
  font-size: 15px;
  line-height: 0;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  flex-grow: 0;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.dashboard .sales-card .card-icon {
  color: #4154f1;
  background: #f6f6fe;
}

.dashboard .revenue-card .card-icon {
  color: #2eca6a;
  background: #e0f8e9;
}

.dashboard .customers-card .card-icon {
  color: #ff771d;
  background: #ffecdf;
}


	.school{
		width: 100%;
background-color: rgb(255, 255, 255);
border-radius: 20px;
box-shadow :rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
box-sizing: border-box;
color: rgb(3, 30, 35);
display: flex;
justify-content: space-between;
font-family:Georgia, 'Times New Roman', Times, serif;
font-size: 16px;
font-weight :600;
height: 96px;
line-height: 24px;
margin-bottom: 30px;
margin-top:5px;
padding: 20px;
text-align: left;
h2{
	color: rgb(0, 0, 255);
	padding-left: 5%;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
p{
  color: #012970;
  font-family: Georgia, 'Times New Roman', Times, serif;
	padding-right: 5%;
  
}

	}

}
</style>