<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText"/>
        </div>

        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book" aria-hidden="true"></i>
            </h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else> Không có thông tin liên hệ nào.</p>

            <div type="button" class="mt-3 justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary margin1" @click="refreshList()">
                    <i class="fas fa-redo" aria-hidden="true"></i>  Làm mới 
                </button>

                <button type="button" class="btn btn-sm btn-success margin1" @click="goToAddContact()">
                    <i class="fas fa-plus" aria-hidden="true"></i> Thêm mới
                </button>

                <button type="button" class="btn btn-sm btn-danger margin1"
                    @click="removeAllContacts()"
                >
                    <i class="fa-solid fa-trash-can"></i> Xoá tất cả
                </button>
            </div>
        </div>

        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiết liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ContactCard from '@/components/ContactCard.vue';
    import InputSearch from '@/components/InputSearch.vue';
    import ContactList from '@/components/ContactList.vue';
    import ContactService from '@/services/contact.service';

    export default{
        components: {
            ContactCard,
            InputSearch,
            ContactList,
        },
        data(){
            return {
                contacts: [],
                activeIndex: -1,
                searchText: "",
            };
        },
        watch: {
            //while searchText variable has been changed disable display it
            //in contactCard component throught make activeIndex = -1
            searchText(){
                this.activeIndex = -1;
            },
        },
        computed: {

            //Convert contact object to String type
            contactStrings() {
                return this.contacts.map((contact)=>{
                    const {name, email, address, phone} = contact;
                    return [name, email, address, phone].join("");
                });

            },

            //return contact match with searchText value and return all contacts if searchText is empty
            filteredContacts() {
                if(!this.searchText) return this.contacts;
                return this.contacts.filter((_contact, index)=>{
                    this.contactStrings[index].includes(this.searchText);
                });
            },

            //active contact is selected to display it
            activeContact(){
                if(this.activeIndex < 0) return null;
                return this.filteredContacts[this.activeIndex];
            },

            filteredContactsCount(){
                return this.filteredContacts.length;
            },
        },
        methods: {
            //retrieve all contact from backend
           async retrieveContacts(){
                try {
                    this.contacts = await ContactService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },

            //refresh data of contact list
            refreshList(){
                this.retrieveContacts();
                this.activeIndex = -1;
            },

            async removeAllContacts(){
                if(confirm("Bạn muốn xoá tất cả các liên hệ?")){
                    try {
                        await ContactService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            goToAddContact(){
                this.$router.push({name: "contact.add"});
            },
        },

        mounted(){
            this.refreshList();
        },
    };
</script>

<style scoped>
    .margin1{
        margin: 2px;
        border-radius: 5px;
    }
.page {
    text-align: left;
    width: 750px;
}
</style>