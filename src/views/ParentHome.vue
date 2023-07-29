<template>
    
      <section class="section">

          <div class="row">

            <div class="col-lg-8">

              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"></h5>

                  <!-- Slides with captions -->
                  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="../assets/13_tiborrogulja_zagrebnights_ur.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                          <h5>"Bienvenue dans notre école, un lieu d'apprentissage et d'épanouissement."</h5>
                          <p>"Préparez-vous à une aventure éducative exceptionnelle au sein de notre école."</p>
                          
  
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="../assets/5_tiborrogulja_zagrebnights_ur.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                          <h5>"Découvrez notre école, où chaque élève est encouragé à atteindre son plein potentiel."</h5>
                          <p>"Un environnement d'apprentissage dynamique qui favorise la curiosité et la créativité."</p>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="../assets/6_tiborrogulja_zagrebnights_ur.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                          <h5>"Explorez notre école et découvrez des opportunités illimitées pour grandir et réussir."</h5>
                          <p>"Un lieu où les rêves deviennent réalité, venez rejoindre notre communauté scolaire."</p>
                        
  
                        </div>
                      </div>
                          <div class="carousel-item">
                          <img src="../assets/9_tiborrogulja_zagrebnights_ur.jpg" class="d-block w-100" alt="...">
                          <div class="carousel-caption d-none d-md-block">
                            <h5> "Nous mettons l'accent sur l'excellence académique et le développement global de chaque élève."</h5>
                            <p>"Une équipe dévouée d'enseignants passionnés pour guider nos élèves vers la réussite."</p>
                           
  
  
                          </div>
                        </div>
                        <div class="carousel-item">
                          <img src="../assets/8_tiborrogulja_zagrebnights_ur.jpg" class="d-block w-100" alt="...">
                          <div class="carousel-caption d-none d-md-block">
                            <h5>"Une école inclusive où la diversité est célébrée et valorisée."</h5>
                            <p>"Nous cultivons la curiosité, l'autonomie et le sens des responsabilités chez nos élèves."</p>
                        
  
  
                          </div>
                        </div>
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>

                  </div><!-- End Slides with captions -->

                </div>
              </div>
             

            </div>
             <form-parents/>
          </div>
        </section>
</template>

<script>
import FormParents from './FormParents.vue';
export default {
    name: 'ParentHome',
    components: {
    FormParents
 }
}
</script>

<style>

</style>