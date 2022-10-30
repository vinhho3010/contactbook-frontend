import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue"

const routes = [
    {
        path: "/", 
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: ()=> import("@/views/NotFound.vue"),
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: ()=> import("@/views/ContactEdit.vue"),
        props: true //enable to use $route.params as props
    },
    {
        path: "/create/",
        name: "contact.add",
        component: ()=> import("@/views/ContactAdd.vue"),
        props: true //enable to use $route.params as props
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;