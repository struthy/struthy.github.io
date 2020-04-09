<template>
  <div class="container-noMobilePad">
    <div class="newsEvents flex">
      <div class="newsEvents__tabs flex">
        <label class="newsEvents__label">Filter by:</label>
        <label class="newsEvents__label" v-bind:class="{ isActive: isAllActive }">
          <input type="radio" class="newsEvents__radio" v-model="selectedType" value="All">
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
            v-model="selectedType"
            v-bind:class="itemType.type"
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
        <li
          class="newsEvents__article flex"
          v-for="(item, index) in paginated('sortedItems')"
          :key="index"
        >
          <div class="newsEvents__iconContainer flex">
            <div class="newsEvents__Img" :class="item.Type"></div>
          </div>
          <div class="newsEvents__snippet">
            <span class="newsEvents__date">{{ item.DateDisplay }}</span>
            <h3 class="newsEvents__header">{{ item.Title }}</h3>
            <p>{{ item.HeaderText }}</p>
            <p>
              <a v-bind:href="item.LinkUrl" class="arrow-link">read more</a>
            </p>
          </div>
        </li>
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
import axios from "axios";
export default {
  data() {
    return {
      allItems: [],
      itemTypes: [],
      itemTypesWithHeading: [],
      selectedType: "All",
      isActive: false,
      sortDirection: "asc",
      paginate: ["sortedItems"]
    };
  },

  created() {
    Array.prototype.unique = function() {
      return this.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
    };
    axios
      .get(
        `https://balfourmanson.master.d8digital.com//umbraco/api/NewsAndEventsApi/getall`
      )
      .then(response => {
        // JSON responses are automatically parsed.
        this.allItems = response.data;
        this.itemTypes = this.allItems
          .map(function(x) {
            return x.Type;
          })
          .unique();
        this.itemTypesWithHeading = this.itemTypes.map(function(type) {
          var heading =
            type === "news"
              ? "News"
              : type === "comment"
              ? "Comments"
              : "Events";
          return {
            type: type,
            typeHeading: heading
          };
        });
      });
  },

  computed: {
    isAllActive() {
      return this.selectedType === "All";
    },
    filteredItems: function() {
      var _this = this;
      return _this.allItems.filter(function(x) {
        return _this.selectedType == "All" || x.Type == _this.selectedType;
      });
    },
    sortedItems: function() {
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