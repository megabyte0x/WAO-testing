local db = {
    Bob = 30
}

Handlers.add("Get-Age", function(msg)
    local age = db[msg.Name]
    if age then
        msg.reply({
            Data = tostring(age)
        })
    else
        msg.reply({
            Data = "Unknown"
        })
    end
end)
