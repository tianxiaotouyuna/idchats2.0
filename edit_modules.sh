# postinstall.sh

RN_SCROLLABLE_TAB_VIEW_FILE="./node_modules/react-native-scrollable-tab-view/index.js"

if [ -e $RN_SCROLLABLE_TAB_VIEW_FILE ]; then
	echo "Patching react-native-scrollable-tab-view to not break on RN 0.63 and new Metro Bundler..."
	sed -i '' "s/const { ViewPropTypes } = ReactNative = require('react-native');/const ReactNative = require('react-native'); const { ViewPropTypes } = ReactNative;/g" $RN_SCROLLABLE_TAB_VIEW_FILE || true
fi