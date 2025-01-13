local db = {
    Bob = 30
}

Handlers.add("Get-Age", function()
    msg.reply({
        Data = "30"
    })
end)
