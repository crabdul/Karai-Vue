<template>
    <div class="items">
        <router-link 
        :to="{ name: 'radio', query: post.acf.title }"
        class="item" >
            <div class="img-container">            
                <div class="playlist-img__box">
                    <div class="playlist-img__number">
                        {{ post.acf.title }}
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
  props: {
    post: { type: Object }
  }
}
</script>