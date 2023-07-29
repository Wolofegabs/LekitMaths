import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            myschool: [], // Tableau des machines
            selectedPromoScolaire: null, // Machine sélectionnée
        };
    },
    mutations: {
        setMyschool(state, myschool) {
            state.myschool = myschool;
        },
        setSelectedPromoScolaire(state, promoScolaire) {
            state.selectedPromoScolaire = promoScolaire;
        },
        updateMyschool(state, promoScolaire) {
            const index = state.myschool.findIndex(p => p.id === promoScolaire.id);
            if (index !== -1) {
                state.myschool[index] = promoScolaire;
            }
        },
        removePromoScolaire(state, promoScolaireId) {
            state.myschool = state.myschool.filter(promoScolaire => promoScolaire.id !== promoScolaireId);
        },
    },
    actions: {
        loadMyschoolFromLocalStorage({ commit }) {

            const storedMyschool = localStorage.getItem('myschool');
            if (storedMyschool) {
                const myschool = JSON.parse(storedMyschool);
                commit('setMyschool', myschool);
            }
        },
        reloadMyschoolFromLocalStorage({ commit }) {
            const storedMyschool = localStorage.getItem('myschool');
            if (storedMyschool) {
                const myschool = JSON.parse(storedMyschool);
                commit('setMyschool', myschool);
            }
        },
    },
});
// Écouteur d'événement pour détecter les changements dans le local storage
window.addEventListener('storage', event => {
    if (event.key === 'machines') {
        store.dispatch('reloadMyschoolFromLocalStorage');
    }
});

export default store;