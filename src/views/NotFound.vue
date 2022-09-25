<template>
    <div class="page container">

        <div class="row">
            <div class="offset-md-4 col-md-6">
                <p>
                    Oops, Không thể tìm thấy trang. 
                </p>
            </div>
        </div>

        <div class="row">
            <router-link class="offset-md-5 col-md-6" style="width:fit-content" to="/" >
                <button class="btn btn-secondary btn-lg btn-block">Trở về trang chủ</button>
            </router-link> 
        </div>
    </div>
</template>

<style scope>
    .page{
        margin-top: 30vh;
    }
    p{
        padding-left: 25px;
        font-size: 24px;
    }
</style>