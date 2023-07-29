<template>
    <div v-if="this.comptableActuelle" id="ClassesPage">
                <div class="pagetitle">
            <h1>My school</h1>

        </div><!-- End Page Title -->
           <section class="one-classe">
                  <div class="row">
                    <div class="col-lg-12">
                        <h3>Liste des classes</h3>
                            <div class="card" v-for="classe in this.promotions" :key="classe.id">
                          <div class="card-body">
                            <h5 class="card-title">{{ classe.title }}</h5>
                  
                            <table class="table datatable">
                              <thead>
                                <tr class="classe" >
                                  <th scope="col">Id</th>
                                  <th scope="col">Titre</th>
                                  <th scope="col">Scolarié</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="classe" v-for="salle in classe.salles" :key="salle.id" @click="goToEleveImpayes(salle)" >
                                  <td scope="row">{{ salle.id }}</td>
                                  <td>{{ salle.name  }}</td>
                                 <td>{{ classe.scolarite }}</td>
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
          
      myschool: JSON.parse(localStorage.getItem("myschool")) || [],
          promotions: [],
      comptableActuelle: JSON.parse(sessionStorage.getItem('comptableActuelle')),
     
        };
    },
  mounted() {
    if (!this.comptableActuelle) {
      this.$router.push('/adminForm'); // Redirige vers la page de connexion
    }
   
    this.recupererPromotions();
    },
          methods: {
     recupererPromotions() {
      // Vérifier s'il y a des objets promoScolaire dans myschool
      if (this.myschool && this.myschool.length > 0) {
        // Récupérer le dernier objet promoScolaire
        this.promotions = this.myschool[this.myschool.length - 1].promotions;
       
      }
    },
 
            goToEleveImpayes(salle) {
             var classItem= salle
              for (const classe of this.promotions) {
                for (const sal of classe.salles) {
                  if (sal === salle) {
                                             classItem = {
              ...salle,
              scolarite: classe.scolarite,
              tranche1: { pourcent: classe.tranches[0].pourcentage, date: classe.tranches[0].date },
              tranche2: { pourcent: classe.tranches[1].pourcentage, date: classe.tranches[1].date },
              tranche3: { pourcent: classe.tranches[2].pourcentage, date: classe.tranches[2].date }
            }
                  }
                }
               
               
        
      }
      
      
        sessionStorage.setItem('classItem', JSON.stringify(classItem));

      const url = `/elevesImpayes/${salle.id}`;

      this.$router.push(url);
    },


  }
};
</script>



<style lang="scss">
#ClassesPage {
    .pagetitle {


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
        
        .card{
            margin-bottom: 20px;
            .classe:hover {
            background: rgb(255, 255, 255);
            color: #4154f1;
        }
        th{
           color: #4154f1;
        }
        }
        


    }
}
</style>
