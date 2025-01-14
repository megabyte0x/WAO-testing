local json = require("json")

_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"
_0RBT_POINTS = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"

FEE_AMOUNT = "1000000000000" -- 1 $0RBT
BASE_URL = "https://api.diadata.org/v1/assetQuotation/Arweave/0x0000000000000000000000000000000000000000"


Handlers.add("Info",
    function(msg)
        msg.reply({
            version = "0.0.1",
            Name = "oracle-test-with-wao"
        })
    end
)

Handlers.add(
    "Get-Request",
    function(msg)
        Send({
            Target = _0RBT_POINTS,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = BASE_URL,
            ["X-Action"] = "Get-Real-Data"
        });
        local res = Receive({ Action = "Receive-Response" })
        local data;

        if res.Data then
            data = json.decode(res.Data)
        else
            data = "Error Occured"
        end

        msg.reply({
            Price = tostring(data.Price),
            Data = "PriceFeed"
        })

        print(Colors.green .. "You have sent a GET Request to the 0rbit process.")
    end
)

Handlers.add(
    "Transfer",
    function()
        Send({
            Target = _0RBT_POINTS,
            Action = "Transfer",
            Recipient = "Pw6aamwaKdmlkgKMNLX1ekzvyBPO8r-S4QhIpL34QVw",
            Quantity = FEE_AMOUNT
        })
    end
)
