echo "Making Fresh Build"

rm android/app/src/main/assets/index.android.bundle
read -p "------> Bundle removed \n" -t 1

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
read -p "------> Bundle created \n" -t 1

rm -r android/app/src/main/res/drawable-hdpi
rm -r android/app/src/main/res/drawable-mdpi
rm -r android/app/src/main/res/drawable-xhdpi
rm -r android/app/src/main/res/drawable-xxhdpi
rm -r android/app/src/main/res/drawable-xxxhdpi
read -p "------> drawable deleted \n" -t 1

cd ./android/ && ./gradlew clean && ./gradlew assembleRelease --warning-mode all && cd ..
read -p "------> Build released \n" -t 1


# mounting build on device for test
# react-native run-android --variant=release &&
# read -p "------> Build Mounted on Android Device \n" -t 1
# react-native log-android
