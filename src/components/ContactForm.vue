<template>
    <Form
        @submit="submitContact"
        :validation-schema="contactFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="contactLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="contactLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="contactLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field
                name="phone"
                type="tel"
                class="form-control"
                v-model="contactLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback"/>
        </div>
        <div class="form-group group-check" >
            <label for="favorite" class="form-check-label my-2">
                <input
                id="favorite"
                name="favorite"
                type="checkbox"
                class="form-check-input mx-1"
                v-model="contactLocal.favorite"
                />
                 <strong>Liên hệ yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-sm btn-primary">
                <i class="fa-solid fa-floppy-disk"></i>  Lưu
            </button>

            <button
                v-if="contactLocal._id"
                type="button"
                class="m-2 btn btn-sm btn-danger"
                @click="deleteContact"
            >
            <i class="fa-solid fa-trash-can"></i> Xóa
            </button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    }, 
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: {type: Object, require: true}
    },
    data(){
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải có ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("Email không đúng")
                .max(50, "Email có tối đa 50 kí tự"),
            address: yup
                .string()
                .max(100, "Địa chỉ có tối đa 100 kí tự"),
            phone: yup
                .string()
                .matches(
                        /((09|03|07|08|05)+([0-9]{8})\b)/g,
                         "Số điện thoại không hợp lệ."),
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
        }
    },

    methods: {
        submitContact(){
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact(){
            this.$emit("delete:contact", this.contactLocal.id);
        }
    }
   }
</script>

<style scoped>
    @import "@/assets/form.css";
</style>