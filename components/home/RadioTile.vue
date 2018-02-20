<template>
    <div class="items">
        <nuxt-link 
        :to="{ name: 'radio', query: { playlist: post.acf.title }}"
        class="item" >
            <div class="img-container">            
                <div class="playlist-img__box">
                    <div class="playlist-img__number">
                        {{ post.acf.title }}
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
export default {
  props: {
    post: { type: Object }
  }
}
</script>