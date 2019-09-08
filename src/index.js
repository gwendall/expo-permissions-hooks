import { useState, useEffect } from 'react';
import { Linking, Platform } from 'react-native'
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from "expo-intent-launcher";

const usePermissions = name => {
	if (!availablePermissions.includes(name)) {
		throw new Error(`Unknown permission "${name}". Must be one of ${JSON.stringify(availablePermissions, null, 2)}`)
	}
	const [status, setStatus] = useState('checking');
	useEffect(() => {
		Permissions.getAsync(Permissions[name]).then(({ status }) => {
			setStatus(status)
			if (status === 'denied') {
				setStatus('checking')
				ask() // Dirty fix for https://github.com/expo/expo/issues/4618
			}
		})
	}, [])
	const ask = () => Permissions.askAsync(Permissions[name]).then(({ status }) => setStatus(status))
	return {
		ask,
		status,
		isChecking: status === 'checking',
		isUndetermined: status === 'undetermined',
		isGranted: status === 'granted',
		isDenied: status === 'denied',
		goToSettings: () => goToSettings(name),
	}
}

const omitProps = ["getAsync", "askAsync", "PermissionStatus"]
export const availablePermissions = Object.keys(Permissions).filter(key => !omitProps.includes(key)).sort()

export const goToSettings = Platform.select({
  ios: (name) => Linking.openURL('app-settings:'),
  android: (name) => {
		const pkg = Constants.manifest.releaseChannel
			? Constants.manifest.android.package
			: "host.exp.exponent";
		return IntentLauncher.startActivityAsync(
		  IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
		  { data: `package:${pkg}` },
		)
  },
})

export default usePermissions
