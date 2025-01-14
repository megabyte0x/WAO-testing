local db = {
    Bob = 30
}

Handlers.add("Get-Age", function(msg)
    msg.reply({
        Data = tostring(db[msg.Name])
    })
end)
