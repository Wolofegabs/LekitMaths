<template>
  <div id="app">
    <layout-wrapper/>

    <div class="page col-8">
     
    <RouterView />

    </div>
  </div>
</template>

<script>
import LayoutWrapper from './components/LayoutWrapper.vue';
import '@fortawesome/fontawesome-free/css/all.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';








export default {
  name: 'App',
  components: {
    LayoutWrapper
      },

}
</script>

<style  lang="scss">
#app {
  font-family: Georgia, 'Times New Roman', Times, serif;

  /*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
  .logo {
    line-height: 1;
  }



  .logo img {
    max-height: 26px;
    margin-right: 6px;
  }

  .logo span {
    font-size: 26px;
    font-weight: 500;
    color: #012970;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .header {
    transition: all 0.5s;
    z-index: 997;
    height: 60px;
    box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
    background-color: #fff;
    padding-left: 20px;
    /* Toggle Sidebar Button */
    /* Search Bar */
  }

  .header .toggle-sidebar-btn {
    font-size: 32px;
    padding-left: 10px;
    cursor: pointer;
    color: #012970;
  }

  

  /*--------------------------------------------------------------
# Header Nav
--------------------------------------------------------------*/
  .header-nav ul {
    list-style: none;
  }

  .header-nav>ul {
    margin: 0;
    padding: 0;
  }

  .header-nav .nav-icon {
    font-size: 22px;
    color: #012970;
    margin-right: 25px;
    position: relative;
  }

  .header-nav .nav-profile {
    color: #012970;
  }

  .header-nav .nav-profile img {
    max-height: 36px;
  }

  .header-nav .nav-profile span {
    font-size: 14px;
    font-weight: 600;
  }

  .header-nav .badge-number {
    position: absolute;
    inset: -2px -5px auto auto;
    font-weight: normal;
    font-size: 12px;
    padding: 3px 6px;
  }

 

  .header-nav .profile {
    min-width: 240px;
    padding-bottom: 0;
    top: 8px !important;
  }

  .header-nav .profile .dropdown-header h6 {
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 600;
    color: #444444;
  }

  .header-nav .profile .dropdown-header span {
    font-size: 14px;
  }

  .header-nav .profile .dropdown-item {
    font-size: 14px;
    padding: 10px 15px;
    transition: 0.3s;
  }

  .header-nav .profile .dropdown-item i {
    margin-right: 10px;
    font-size: 18px;
    line-height: 0;
  }

  .header-nav .profile .dropdown-item:hover {
    background-color: #f6f9ff;
  }

  /*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 23%;
    z-index: 0;
    transition: all 0.3s;
    padding: 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #aab7cf transparent;
    box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
    background-color: #fff;
  }



  .sidebar::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #fff;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background-color: #aab7cf;
  }

  @media (min-width: 1200px) {

    #main,
    #footer {
      margin-left: 300px;
    }
  }

  @media (max-width: 1199px) {
    .toggle-sidebar .sidebar {
      left: 0;
    }
  }

  @media (min-width: 1200px) {

    .toggle-sidebar #main,
    .toggle-sidebar #footer {
      margin-left: 0;
    }

    .toggle-sidebar .sidebar {
      left: -300px;
    }
  }

  .sidebar-nav {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .sidebar-nav li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .sidebar-nav .nav-item {
    margin-bottom: 5px;
  }

  .sidebar-nav .nav-heading {
    font-size: 11px;
    text-transform: uppercase;
    color: #899bbd;
    font-weight: 600;
    margin: 10px 0 5px 15px;
  }

  .sidebar-nav .nav-link {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #4154f1;
    transition: 0.3;
    background: #f6f9ff;
    padding: 10px 15px;
    border-radius: 4px;
  }

  .sidebar-nav .nav-link i {
    font-size: 16px;
    margin-right: 10px;
    color: #4154f1;
  }

  .sidebar-nav .nav-link.collapsed {
    color: #012970;
    background: #fff;
  }

  .sidebar-nav .nav-link.collapsed i {
    color: #899bbd;
  }

  .sidebar-nav .nav-link:hover {
    color: #4154f1;
    background: #f6f9ff;
  }

  .sidebar-nav .nav-link:hover i {
    color: #4154f1;
  }

  .sidebar-nav .nav-link .bi-chevron-down {
    margin-right: 0;
    transition: transform 0.2s ease-in-out;
  }

  .sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
    transform: rotate(180deg);
  }

  .sidebar-nav .nav-content {
    padding: 5px 0 0 0;
    margin: 0;
    list-style: none;
  }

  .sidebar-nav .nav-content a {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #012970;
    transition: 0.3;
    padding: 10px 0 10px 40px;
    transition: 0.3s;
  }

  .sidebar-nav .nav-content a i {
    font-size: 6px;
    margin-right: 8px;
    line-height: 0;
    border-radius: 50%;
  }

  .sidebar-nav .nav-content a:hover,
  .sidebar-nav .nav-content a.active {
    color: #4154f1;
  }

  .sidebar-nav .nav-content a.active i {
    background-color: #4154f1;
  }


  .navbar {
    font-family: Georgia, 'Times New Roman', Times, serif;
    height: 15%;
    margin-top: 0px;
    position: fixed;
    z-index: 1;
    background-color: rgb(255, 255, 255);
    width: 100%;
    border-bottom: 1px solid darkgray;
    box-shadow: bisque;

  }




  .containers {
    overflow: scroll;
    margin-top: 8%;
    overflow-x: hidden;
    position: fixed;
    font-family: Georgia, 'Times New Roman', Times, serif;
    left: 0;
    top: 0;
    border-radius: 5px;
    width: 20%;
    height: 500px;
    background-color: #1026b6;
    background-size: 20px;
  }

  .page {
    margin-left: 25%;
    width: 70%;
    height: 500px;
    overflow: scroll;
    overflow-x: hidden;
    margin-top: 8%;
    z-index: 0;
    position: fixed;
    font-family: Georgia, 'Times New Roman', Times, serif;

  }
}
</style>
