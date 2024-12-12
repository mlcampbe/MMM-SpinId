# Module: MMM-SpinId

This [MagicMirror](https://github.com/MichMich/MagicMirror) modules, shows latest winning Wheel of Fortune spin ID numbers. If your spin ID happens to be a winner then it will be highlighted for you.

![Magic-Mirror Module MMM-SpinId screenshot](https://raw.githubusercontent.com/mlcampbe/MMM-SpinId/main/screenshot.png)

Tested with:
- Raspberry Pi

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- npm
- OS level utilities curl, cut, awk, grep, etc...
- Uses data provided by www.wheeloffortunesolutions.com thus requires that the website have current data

## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/mlcampbe/MMM-SpinId
```

Navigate to the new `MMM-SpinId` folder and install the node dependencies.
```
cd MMM-SpinId/ && npm install
```

Configure the module in your `config.js` file.

## Update the module

Navigate into the `MMM-SpinId` folder with `cd ~/MagicMirror/modules/MMM-SpinId` and get the latest code from Github with `git pull`.

If you haven't changed the modules, this should work without any problems. Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
modules: [
	{
		module: 'MMM-SpinId',
		position: 'top_center', // This can be any of the regions.
		config: {
                        header: "Wheel of Fortune Spin-IDs",
			updateInterval: 43200000, // every 12 hours
			mySpinId: " MCxxxxxx", // your WOF spin id
			winningColor: 'red', // color to use if you win
		},
	},
]
```

## Configuration options

The following properties can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content needs to be fetched? (Milliseconds)
				<br><b>Possible values:</b> <code>1000</code> - <code>86400000</code>
				<br><b>Default value:</b> <code>43200000</code> (12 hours)
			</td>
		</tr>
		<tr>
			<td><code>mySpinId</code></td>
			<td>What Wheel of Fortune spin ID to check
				<br><b>Default value:</b> <code>XXXXXX</code> (dummy value, must be set)
			</td>
		</tr>
		<tr>
			<td><code>winningColor</code></td>
			<td>If your spin ID is a winner what color to use
				<br><b>Default value:</b> <code>red</code>
			</td>
		</tr>
		<tr>
			<td><code>displayStyle</code></td>
			<td>Display the output in a single line or as bullet points.
				<br><b>Possible values:</b> <code>line or list</code>
				<br><b>Default value:</b> <code>line</code>
			</td>
		</tr>
	</tbody>
</table>


