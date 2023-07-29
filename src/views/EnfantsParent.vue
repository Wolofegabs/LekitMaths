<template>
  <div id="ParentLoginPage" >
    <div >
      <section class="one-classe" v-if="eleves.length > 0">
        <div class="row">
          <div class="col-lg-12">

            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Mes Enfants</h4>

                <table class="table datatable">
                  <thead>
                    <tr class="classe">
                      <th scope="col">Nom</th>
                      <th scope="col">Prénom</th>
                      <th scope="col">Classe</th>
                      <th scope="col">EleveId</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="classe" v-for="eleve in eleves" :key="eleve.mat" @click="goToEleveInfos(eleve)">
                      <td scope="row">{{ eleve.nom }}</td>
                      <td>{{ eleve.prenom }}</td>
                      <td>{{ eleve.classe }}</td>
                      <td>{{ eleve.mat }}</td>
                    </tr>
                  </tbody>
                </table>


              </div>
            </div>


          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {

      eleves: JSON.parse(sessionStorage.getItem('mesEnfants')) || [],
     
    }
  },
  mounted() {
    if (this.eleves&&this.eleves.length === 0) {
      this.$router.push('/'); // Redirige vers la page de connexion
    }
  },
  methods: {
            goToEleveInfos(eleve) {
      
     
      sessionStorage.setItem('eleve', JSON.stringify(eleve));
              const eleveId= eleve.mat
    
      const url = `/ParentPage/${eleveId}`;

      this.$router.push(url);
    },
  }


}
</script>


<style lang="scss">
#ParentLoginPage {
  .pagetitle {
    color: #4154f1;

  }

  font-family: Georgia,
  'Times New Roman',
  Times,
  serif;

  .one-classe {

    .card {
      margin-bottom: 30px;
      padding-bottom: 10px;

      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      box-shadow: rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
      box-sizing: border-box;
      color: rgb(3, 30, 35);

      h4 {
        color: #4154f1;
      }
      th{
        color: #4154f1;
      }

    }

    padding-bottom: 10px;
    margin-bottom: 5px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow :rgba(0.08, 0, 0, 0.08) 0px 0px 28px 0px;
    box-sizing: border-box;
    color: rgb(3, 30, 35);


  }
}
</style>

