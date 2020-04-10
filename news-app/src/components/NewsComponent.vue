<template>
  <div class="container-noMobilePad">
    <div class="newsEvents flex">
      <div class="newsEvents__tabs flex">
        <label class="newsEvents__label">Filter by:</label>
        <label class="newsEvents__label" v-bind:class="{ isActive: isAllActive }">
          <input type="radio" class="newsEvents__radio" value="All">
          <span>View all</span>
        </label>
        <label
          class="newsEvents__label"
          v-for="(itemType, index) in itemTypesWithHeading"
          :class="activeItem(itemType.type)"
          :key="index"
        >
          <input
            type="radio"
            class="newsEvents__radio"
            v-bind:class="itemType.type"
            @Click="$store.commit('changeSelectedType', itemType.type)"
            :value="itemType.type"
          >
          <span class="newsEvents__tabIcon" v-bind:class="itemType.type"></span>
          <span>{{ itemType.typeHeading }}</span>
        </label>
      </div>

      <paginate
        class="newsEvents__allArticles flex"
        name="sortedItems"
        :list="sortedItems"
        :per="12"
        ref="paginator"
      >
        <!-- article snippet -->
        <ArticleCardComponent
          v-for="(item, index) in paginated('sortedItems')"
          :key="index"
          :title="item.Title"
          :date="item.DateDisplay"
          :header="item.HeaderText"
          :link="item.LinkUrl"
        />
      </paginate>
      <div class="paginate-container">
        <p class="paginate-info" v-if="$refs.paginator">
          Showing
          <span>{{ $refs.paginator.pageItemsCount }}</span> results
        </p>
        <paginate-links for="sortedItems" :limit="3" :show-step-links="true"></paginate-links>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCardComponent from "@/components/ArticleCardComponent.vue";
export default {
  data() {
    return {
      isActive: false,
      sortDirection: "asc",
      paginate: ["sortedItems"]
    };
  },
  components: {
    ArticleCardComponent
  },

  computed: {
    allItems() {
      return this.$store.state.articles;
    },
    isAllActive() {
      return this.selectedType === "All";
    },
    selectedType() {
      return this.$store.state.selectedType;
    },
    filteredItems() {
      this.$store.getters.filteredItems;
    },
    itemTypes() {
      return this.$store.getters.articleTypes;
    },
    itemTypesWithHeading() {
      if (!this.itemTypes) return;

      return this.itemTypes.map(function(type) {
        var heading =
          type === "news" ? "News" : type === "comment" ? "Comments" : "Events";
        return {
          type: type,
          typeHeading: heading
        };
      });
    },
    sortedItems: function() {
      if (!filteredItems) return;

      var _this = this;

      return _this.filteredItems.sort((a, b) => {
        return new Date(b.Date) - new Date(a.Date);
      });
      // ask lydia to remove any past events from feed
    }
  },

  methods: {
    activeItem: function(category) {
      if (this.selectedType === category) {
        return "isActive";
      } else {
        return "";
      }
    },

    isActivePagination: function(x) {
      if (this.currentPage === x) {
        return "isActive";
      } else {
        return false;
      }
    },

    onChangePage(sortedItems) {
      // update page of items
      this.sortedItems = sortedItems;
    }
  }
};
</script>