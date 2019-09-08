expo-permissions-hooks
======

A simple way to use handle Expo permissions through react hooks

[Demo](https://expo.io/@gwendall/expo-permissions-hooks)  
[Demo code](https://github.com/gwendall/expo-permissions-hooks-demo)  

## Installation ##

```shell
npm install expo-permissions-hooks
```

## Quick start ##

```javascript
import usePermissions from 'expo-permissions-hooks'
const DemoComponent = () => {
  const permission = usePermissions('CONTACTS')
  return (
    <View>
      <Text>{`Status is ${permission.status}`}</Text>
      {permission.isUndetermined && (
        <>
          <Text>{'Permission is undetermined.'}</Text>
          <Button title="Grant Contacts permission ?" onPress={permission.ask} />
        </>
      )}
      {permission.isGranted && (
        <Text>{'Permission is granted.'}</Text>
      )}
      {permission.denied && (
        <Text>{'Permission is denied.'}</Text>
      )}
      {(permission.isGranted || permission.isDenied) && (
        <Button title="Change your mind ?" onPress={permission.goToSettings} />
      )}
    </View>
  )
}
```

That's it.

## Options ##

```javascript
const permission = usePermissions(PERMISSION)
```

Name | Type | Description
---|---|---
permission | String | One of []

The function `usePermissions` expects on single parameter, the required permission.

## Methods ##

Name | Type | Description
---|---|---
status | String | The status of the permission
isChecking | Boolean | Whether the permission is being checked
isUndetermined | Boolean | Whether the permission has never been asked yet
isGranted | Boolean | Whether the permission has been granted
isDenied | Boolean | Whether the permission has been denied
ask | Function | Ask the permission
goToSettings | Function | Go to the OS' settings to change the given permission

## To do ##

- fix Android erratic `status` values
- set Android `goToSettings` correct route through `IntentLauncher`


## Contribute ##

* Fork & pull request.
* If you planning add some feature please create issue before.

Otherwise changes will be rejected.

## Licence ##

The MIT License

Copyright (c) 2019 Gwendall Esnault gwendall.esnault@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
