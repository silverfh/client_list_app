# client_list_app
Client List Application

>>>> Simple Client List Application similar to contacts app <<<

***
* app fetches data saved under assets/clients.json as JSON data
* (faker) was used to create the data and save it in the above mentioned file.
- faker functions are still in the app as following in order to understand the method
- toDataURL() > converted fetched image resource to base64 string
- generateFakeData() > generated the required fake data
- getimg() > parse through the fetched data array to be used in (toDataURL)
- imgToDataURL() > sends a async query to (toDataURL)

* a custom modal component is created by using react-native/Modal to add swipe down function in contact details MODAL WINDOW


********** Search functionality *********
filterList() > filters the data array based on search bar input
to overcome case sensitive results data array is converted into JSON string and converted in to small case
and then parsed again as JSON data
since we are using small case keys so it wont effect the object names in data array.


********* creating .apk build ********
simply run the following command in your terminal
> sh ./buildAPK.sh

the build will be created under android/app/build/outputs/apk/release/app-release.apk
