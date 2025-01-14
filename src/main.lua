local json = require('json')
Handlers.add(
    "Hello",
    function(msg)
        msg.reply({
            Data = "Hello World!",
            TestingGet = "1",
            Name = "Megabyte"
        })
    end
)


Handlers.add("Check-Age", function(msg)
    msg.reply({ Data = "How old are you?" })
    local age = Send({
        Target = msg.To, Action = "Get-Age", Name = msg.Who
    }).receive().Data
    msg.reply({ Data = "age", Name = msg.Who, Age = age })
end
)
