<template>
    <div id="ClassesPage" v-if="this.comptableActuelle">
            <div class="pagetitle">
          <h1>Nos élèves</h1>

          <div class="">
              <form class="search-form d-flex align-items-center">
                  <input type="text" v-model="searchExpression" placeholder="Rechercher un élève par nom, prénom ou classe" @input="filterStudents">
                  <button type="submit"  ><i class="fa fa-search"></i></button>
              </form>
          </div><!-- End Search Bar -->

      </div><!-- End Page Title -->
 
            <section class="one-classe">
              <div class="row">
                <div class="col-lg-12">

                        <div class="card">
                      <div class="card-body">
                        <h5 class="card-title"></h5>
                  
                        <table class="table datatable">
                          <thead>
                            <tr class="classe" >
                              <th scope="col">Nom</th>
                              <th scope="col">Prénom</th>
                              <th scope="col">Classe</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="classe" v-for="eleve in filteredStudents" :key="eleve.mat" @click="goToEleveInfos(eleve)">
                              <td scope="row">{{ eleve.nom }}</td>
                              <td>{{ eleve.prenom }}</td>
                              <td>{{ eleve.className }}</td>
                            </tr>
                          </tbody>
                        </table>
                 

                      </div>
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
           
            myschool : JSON.parse(localStorage.getItem("myschool"))|| [],
            searchExpression: '',
          filteredStudents: [],
          promo: [],
            comptableActuelle: JSON.parse(sessionStorage.getItem('comptableActuelle')),
        }
  },
  mounted() {
    if (!this.comptableActuelle) {
      this.$router.push('/adminForm'); // Redirige vers la page de connexion
    }
   console.log(this.searchExpression)
    this.filterStudents() 
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

    filterStudents() {
      const expression = this.searchExpression.toLowerCase();
      this.filteredStudents = [];

      for (const classe of this.recupererDernierPromo()) {
        for (const salle of classe.salles) {
          for (const eleve of salle.eleves) {
                    const nom = eleve.nom.toLowerCase();
            const prenom = eleve.prenom.toLowerCase();
            const clas = salle.name.toLowerCase();

            if (nom.includes(expression) || prenom.includes(expression) || clas.includes(expression)) {
              const studentWithClassName = {
                ...eleve,
                className: salle.name,
                classeId: salle.id,
                scolarite: classe.scolarite,
                tranche1: { pourcent: classe.tranches[0].pourcentage, date: classe.tranches[0].date },
                tranche2: { pourcent: classe.tranches[1].pourcentage, date: classe.tranches[1].date },
                tranche3: { pourcent: classe.tranches[2].pourcentage, date: classe.tranches[2].date }

              };
             
              this.filteredStudents.push(studentWithClassName);
            }
          }
        }
      }
        },
        goToEleveInfos(eleve) {
          
       sessionStorage.setItem('eleve', JSON.stringify(eleve));
      const classId= eleve.mat
      
      const url = `/classe/elevepage/${classId}`;

      this.$router.push(url);
        },


  }

   


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
                visibility: hidden;
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
            background:rgb(255, 255, 255);
            color: #4154f1;
        }


    }
}


</style>
