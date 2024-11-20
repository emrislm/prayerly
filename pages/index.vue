<template>
	<div class="py-4 flex flex-col items-center gap-4 h-screen">
		<InputText class="sm:w-auto w-9/12" type="text" v-model="city" placeholder="Zoek een stad..." @keyup.enter="getTimes()" />
		<div v-if="isLoading"><ProgressSpinner style="width: 50px; height: 50px" /></div>
		<div v-else class="flex sm:flex-row sm:w-auto w-9/12 flex-col gap-1">
			<Card v-for="t in timings" class="text-center">
				<template #title>{{ t.time }}</template>
				<template #content>{{ t.name }}</template>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { format } from "date-fns";

	const city = ref<string>("");
	const isLoading = ref(false);
	const timings = ref<any[]>([]);
	const prayerTimes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

	const getTimes = async () => {
		const data = await useFetch(`https://api.aladhan.com/v1/timingsByCity/${format(new Date(), "dd-MM-yyyy")}`, {
			query: {
				city: city.value,
				country: city.value,
				method: 13,
			},
			onRequest({ request, options }) {
				console.log("req:", request);
				isLoading.value = true;
			},
			onResponse({ request, response, options }) {
				if (response.status == 200) {
					timings.value = Object.entries(response._data.data.timings)
						.filter(([key]) => prayerTimes.includes(key))
						.map(([name, time]) => ({ name, time }));

					console.log("timings:", timings.value);
					isLoading.value = false;
				} else {
					console.log("getTimes() - Something went wrong.");
				}
			},
		});
	};
</script>

