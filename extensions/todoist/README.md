<img width="300" align="right" alt="rokii-todoist logo" src="https://user-images.githubusercontent.com/77246331/174854937-535dccc9-6d27-4bf8-927f-f4e664ca0a0f.png"/>

# cerebro-todoist &nbsp; ![npm](https://img.shields.io/npm/v/cerebro-cerebro-todoist?color=green) ![download number](https://img.shields.io/npm/dt/cerebro-cerebro-todoist)

> [Rokii](https://rokii.app) plugin to create and manage Todoist tasks.

⚠️ Rokii-Todoist is an extension that IS NOT created by, affiliated with,
or supported by @Doist

## Installation

- Type `plugins todoist` into Rokii
- Click `install`
- Set your Todoist API token in the plugin
settings --> `plugins todoist` - Select `settings` - `token`

<p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/77246331/169042136-e94d61a0-9bac-4992-80f3-0c62396a616d.png"

## Usage

### Available commands

- `tds new` ➡️ Creates a new task (natural language syntax supported)
- `tds today` ➡️ Returns a list with tasks for today and overdue tasks
  - Navigate between them to see details
- `tds view` + filter ➡️ Returns tasks matching the filter
(ex: 18/05, tomorrow, today, search: buy, ...).
For more information about this filters see [Todoist Documentation](https://todoist.com/help/articles/introduction-to-filters)

😎 You can search between tasks just by typing ➡️ `tds today milk` - Filters
the tasks and returns the ones that have "milk" in their name
(same with `tds view 12/10 & search:milk`)

⚡ Due to performance issues and API restrictions,
project names will only appear if the number of matching tasks is less than 10

💡 You can configure the command names in the plugin
settings page ➡️ `plugins todoist settings`

## Need Support?

You can [open an issue](https://github.com/rokiiapp/extensions/issues/new) in
this repository or [contact me by email](mailto:dubisdev@gmail.com)

## Related

- [RokiiApp](http://github.com/rokiiapp/app) – main repo for Rokii

## Privacy Policy

No user data is collected. Once you install the plugin it makes requests
directly to the Todoist API and the responses are sent directly to your computer.
Just simple, fast and private.

## License

MIT © [David Jiménez](https://dubis.dev)
