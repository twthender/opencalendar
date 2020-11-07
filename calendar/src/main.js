import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
    notes: [
        {
            title: "Alice in Wonderland Quote",
            content: "“The sun was shining on the sea,\n" +
                "Shining with all his might:\n" +
                "He did his very best to make\n" +
                "The billows smooth and bright\n" +
                "-- And this was odd, because it was\n" +
                "The middle of the night.\n" +
                "\n" +
                "The moon was shining sulkily,\n" +
                "Because she thought the sun\n" +
                "Had got no business to be there\n" +
                "After the day was done\n" +
                "-- \"It's very rude of him,\" she said,\n" +
                "\"To come and spoil the fun!\"\n" +
                "\n" +
                "The sea was wet as wet could be,\n" +
                "The sands were dry as dry.\n" +
                "You could not see a cloud, because\n" +
                "No cloud was in the sky:\n" +
                "No birds were flying overhead\n" +
                "-- There were no birds to fly.\n" +
                "\n" +
                "In a Wonderland they lie\n" +
                "Dreaming as the days go by,\n" +
                "Dreaming as the summer die.” "
        },
        {
            title: "General Conference",
            content: "Increased gospel study in many homes is resulting in stronger testimonies and family relationships. One mother wrote: “We feel much closer to our children and grandchildren now that we gather on Zoom every Sunday. Each takes a turn giving their thoughts on Come, Follow Me. Prayers for our family members have changed because we better understand what they need.”\n" +
                "\n" +
                "I pray that we as a people are using this unique time to grow spiritually. We are here on earth to be tested, to see if we will choose to follow Jesus Christ, to repent regularly, to learn, and to progress. Our spirits long to progress. And we do that best by staying firmly on the covenant path.\n" +
                "\n" +
                "Through"
        }
    ],
    tasks: [{
        title: "Finish CS260 Homework",
        content: "Finish up some of the CS260 Labs and Activities."
    },
    {
        title: "Finish Homework for other classes",
        content: "Write essay for English class, do Math homework for tomorrow"
    },
    {
        title: "Clean Up Apartment",
        content: "The kitchen and main room needs to be cleaned"
    },
    ],
    calendar: {
        year: 2020,
        month: 11,
        eventsRetrieved: false,
        events: {},
        filters: {
            "National holiday": true,
            "Orthodox": true,
            "Local holiday": true,
            "Observance": true,
            "Sporting event": true,
            "Worldwide observance": true,
            "United Nations observance": true,
            "Other": true
        },
    }
}

new Vue({
    router,
    data,
    render: h => h(App)
}).$mount('#app')
