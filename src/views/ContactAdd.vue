<template>
    <div class="page">
        <div class="col-md-4 offset-md-4">
            <h4>Tạo mới Liên hệ</h4>
            <ContactForm
                :contact="contact"
                @submit:contact="createContact"
            />
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from '@/services/contact.service';

    export default{
    components:{
            ContactForm,
        },
    data(){
        return {
            contact: {},
            message: "",
        }
    },
    methods:{
        async createContact(data){
            try {
                this.contact = await ContactService.create(data);
                this.message = "Liên hệ được thêm mới thành công";
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>