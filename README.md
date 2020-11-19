
### commands

`event-cli publish -k event.key`

`--help` to display available commands

### Events sturcture
``` json
[
    ["event.key", {
        "exchange": "event-exchange",
        "contentType": "application/json",
        "key": "events.key",
        "data": {
            "Test": "Test"
        }
    }]
]
```
Example event. To add more copy sturcture and add to array

### Environment Variables
EVENT_CLI_FILE_LOCATION - Location of file that contains events NEEDS TO BE .json
RABBIT_URL - String for rabbit url
