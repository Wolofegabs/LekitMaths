import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import ElevePage from '../views/ElevePage.vue'
import ClassesList from '../views/ClassesList.vue'
import AccueilParent from '../views/AccueilParent.vue'
import AdminForm from '../views/AdminForm.vue'
import EnfantsParent from '../views/EnfantsParent.vue'
import ParentPage from '../views/ParentPage.vue'
import ImpayesClasses from '../views/impayes/ImpayesClasses.vue'
import ElevesImpayes from '../views/impayes/ElevesImpayes.vue'
import ParamsPage from '../views/ParamsPage.vue'
import ParentHome from '../views/ParentHome.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AlternateLayout from '../components/AlternateLayout.vue'
import AdminLayout from '../components/AdminLayout.vue'
import AdminHome from '../views/adminHome.vue'
import SchoolContacts from '../views/SchoolContacts.vue'
import RapportSalle from '../components/RapportSalle.vue'
import RapportClasse from '../components/RapportClasse.vue'
import ComptablesListe from '../components/ComptablesListe.vue'
import ArchivesPage from '../views/archives/ArchivesPage.vue'
import ArchiveClasses from '../views/archives/ArchiveClasses.vue'
import ArchivesEleve from '../views/archives/ArchivesEleve.vue'
import ArchivesPaiementeleve from '../components/ArchivesPaiementeleve.vue'
import ArchivesImpayesClasse from '../views/archives/ArchivesImpayesClasse.vue'
import ArchivesEleveImpayes from '../views/archives/ArchivesEleveImpayes.vue'
import ArchiveRapportSalle from '../views/archives/ArchiveRapportSalle.vue'
import ArchivesRapportClasse from '../views/archives/ArchivesRapportClasse.vue'
import ComptableForm from '../views/ComptableForm.vue'



const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/admin',
            name: 'home',
            component: HomePage,
            meta: { layout: AlternateLayout }

        }, {
            path: '/',
            name: 'ParentHome',
            component: ParentHome,
            meta: { layout: DefaultLayout }

        }, {
            path: '/classes',
            name: 'ClassesList',
            component: ClassesList,
            meta: { layout: AlternateLayout }

        }, {
            path: '/classe/elevepage/:id',
            name: 'Eleve',
            component: ElevePage,
            meta: { layout: AlternateLayout }

        }, {
            path: '/adminForm',
            name: 'adminForm',
            component: AdminForm,

        }, {
            path: '/superAdmin',
            name: 'superAdmin',
            component: ComptableForm,

        }, {
            path: '/impayesClasses',
            name: 'Impayes',
            component: ImpayesClasses,
            meta: { layout: AlternateLayout }

        }, {
            path: '/elevesImpayes/:id',
            name: 'ElevesImpayes',
            component: ElevesImpayes,
            meta: { layout: AlternateLayout }

        }, {
            path: '/rapport-salle',
            name: 'rapportSalle',
            component: RapportSalle,
            meta: { layout: AlternateLayout }

        },
        {
            path: '/rapport-classe',
            name: 'rapportClasse',
            component: RapportClasse,
            meta: { layout: AlternateLayout }

        }, {
            path: '/contacts',
            name: 'Contacts',
            component: SchoolContacts,
            meta: { layout: AdminLayout }

        }, {
            path: '/comptables-liste',
            name: 'Comptables',
            component: ComptablesListe,
            meta: { layout: AdminLayout }

        },
        {
            path: '/adminHome',
            name: 'adminHome',
            component: AdminHome,
            meta: { layout: AdminLayout }

        },
        {
            path: '/Settings',
            name: 'paramètre',
            component: ParamsPage,
            meta: { layout: AdminLayout }

        }, {
            path: '/archives',
            name: 'Archives',
            component: ArchivesPage,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archives-classes',
            name: 'ArchivesClasses',
            component: ArchiveClasses,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archives-eleve/:id',
            name: 'ArchivesEleve',
            component: ArchivesEleve,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archives-paiement',
            name: 'ArchivesPaiement',
            component: ArchivesPaiementeleve,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archives-impayesClasses',
            name: 'ArchivesImpayesClasse',
            component: ArchivesImpayesClasse,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archives-eleve-impayes/:id',
            name: 'ArchivesElevesImpayes',
            component: ArchivesEleveImpayes,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archive-rapport-salle',
            name: 'ArchiverapportSalle',
            component: ArchiveRapportSalle,
            meta: { layout: AlternateLayout }

        }, {
            path: '/archives-rapport-classe',
            name: 'ArchivesrapportClasse',
            component: ArchivesRapportClasse,
            meta: { layout: AlternateLayout }

        }, {
            path: '/AccueilParent',
            name: 'Parent',
            component: AccueilParent,
            meta: { layout: DefaultLayout }
        },
        {
            path: '/child-liste',
            name: 'childList',
            component: EnfantsParent,
            meta: { layout: DefaultLayout }

        }, {
            path: '/ParentPage/:id',
            name: 'parentPage',
            component: ParentPage,
            meta: { layout: DefaultLayout }

        }, {
            path: '/my-school-contacts',
            name: 'contacts-Parents',
            component: SchoolContacts,
            meta: { layout: DefaultLayout }

        }


    ]
})

export default router