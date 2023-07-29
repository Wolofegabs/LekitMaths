<template>
    <div v-if="this.currentPromoScolaire">
        <div class="pagetitle">
            <h1>My school</h1>

        </div><!-- End Page Title -->
        <section class="one-classe">
            <div class="row">
                <div class="col-lg-12">
                    <h3>Liste des classes</h3>
                    <div class="card" v-for="classe in this.currentPromotion.promotions" :key="classe.id">
                        <div class="card-body">
                            <h5 class="card-title">{{ classe.title }}</h5>

                            <table class="table datatable">
                                <thead>
                                    <tr class="classe">
                                        <th scope="col">Id</th>
                                        <th scope="col">Titre</th>
                                        <th scope="col">Scolarié</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="classe" v-for="salle in classe.salles" :key="salle.id"
                                        @click="goToEleveImpayes(salle)">
                                        <td scope="row">{{ salle.id }}</td>
                                        <td>{{ salle.name }}</td>
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


           
            currentPromotion: JSON.parse(sessionStorage.getItem("currentPromoScolaire")) || {},
        };
    },
    mounted() {
        if (!this.currentPromoScolaire) {
            this.$router.push('/archives'); // Redirige vers la page de connexion
        }
    },
    methods: {
    

        goToEleveImpayes(salle) {
            var classItem = salle
            for (const classe of this.currentPromotion.promotions) {
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

            const url = `/archives-eleve-impayes/${salle.id}`;

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

        .card {
            margin-bottom: 20px;

            .classe:hover {
                background: rgb(255, 255, 255);
                color: #4154f1;
            }
        }



    }
}</style>
