<template>
    <div>
        <header id="header" class="header fixed-top d-flex align-items-center">

            <div class="d-flex align-items-center justify-content-between">
                <a href="#" class="logo d-flex align-items-center">
                    <img src="#" alt="">
                    <span class="d-none d-lg-block">My school</span>
                </a>

            </div><!-- End Logo -->

            <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">
                    <li class="nav-item dropdown pe-3">

                        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">

                            <button class="btn btn-primary" @click="this.deconnexion()"> Se déconnecter</button>
                        </a><!-- End Profile Iamge Icon -->


                    </li><!-- End Profile Nav -->

                </ul>
            </nav><!-- End Icons Navigation -->

        </header><!-- End Header -->

        <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">

                <li class="nav-item">
                    <a class="nav-link " href="/adminHome">
                        <span>Dashboard</span>
                        <!--i class="dashboard-icon fas fa-tachometer-alt"></i-->
                    </a>
                </li><!-- End Dashboard Nav -->

             
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/comptables-liste">
                        <span>Comptables</span>
                        <!--i class="salary-icon fas fa-money-bill ms-auto"></i-->
                    </a>
                </li><!-- End Charts Nav -->
              

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/Settings">
                        <span>Paramètres</span>
                        <!--i class="fas fa-cog ms-auto"></i-->
                    </a>

                </li><!-- End Icons Nav -->
                

                <li class="nav-heading">Pages</li>




                <li class="nav-item">
                    <a class="nav-link collapsed" href="/contacts">
                        <span>Contact</span>
                        <i class="bi bi-envelope"></i>
                    </a>
                </li><!-- End Contact Page Nav -->

                <li class="nav-item">
                    <a class="nav-link collapsed" href="/superAdmin">
                        <span>Login</span>
                        <i class="bi bi-box-arrow-in-right"></i>
                    </a>
                </li><!-- End Login Page Nav -->

            </ul>

        </aside><!-- End Sidebar-->

    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
     methods: {
        // La fonction pour supprimer la session et rediriger vers la page de connexion
        deconnexion() {
            // Suppression de la session
            sessionStorage.removeItem('adminActuelle');

            // Redirection vers la page de connexion (vous pouvez remplacer "chemin/vers/connexion" par votre URL réelle)
            this.$router.push('/superAdmin'); // Redirige vers la page d'accueil
        }
    },


}
</script>

<style></style>