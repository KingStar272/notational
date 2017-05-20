<template>
  <div
    id="nv"
    class="nv"
    :class="theme">
    
    <div class="container">
      <spinner v-if="loading">
      </spinner>

      <template v-else>
        <search>
        </search>

        <editor>
        </editor>

        <foot>
        </foot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions }  from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import { User } from '../../classes'
import { localStorageMixin } from '../../mixins'
import Spinner from '../../components/Spinner.vue'
import Search from '../../components/Search/Index.vue'
import Editor from '../../components/Editor/Index.vue'
import Foot from '../../components/Foot/Index.vue'

interface NV extends Vue {
  loading: boolean
  theme: string
  FETCH_USER_DATA (): any
  SET_USER (): void
  ls_pullUser (): User
}

export default {
  name: 'nv',

  mixins: [localStorageMixin],

  data: () => ({
    loading: true
  }),

  created () {
    const user: User = this.ls_pullUser()
    this.SET_USER(user)
    this.FETCH_USER_DATA()
      .then(() => {
        this.loading = false
      })
  },

  components: {
    Editor,
    Foot,
    Search,
    Spinner
  },

  computed: {
    ...mapGetters([
      'theme'
    ])
  },

  methods: {
    ...mapActions([
      'FETCH_USER_DATA',
    ]),
    ...mapMutations([
      'SET_USER'
    ])
  },

  head: {
    title: {
      inner: 'App'
    }
  }

} as ComponentOptions<NV>
</script>
