-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONEXÃO
-----------------------------------------------------------------------------------------------------------------------------------------
src = {}
Tunnel.bindInterface("nav_conce", src)
vCLIENT = Tunnel.getInterface("nav_conce")
local inventory = module("vrp", "cfg/inventory")
-----------------------------------------------------------------------------------------------------------------------------------------
-- SQL
-----------------------------------------------------------------------------------------------------------------------------------------
vRP._prepare("creative/get_vehicle", "SELECT * FROM vrp_user_vehicles WHERE user_id = @user_id")
vRP._prepare("creative/rem_vehicle", "DELETE FROM vrp_user_vehicles WHERE user_id = @user_id AND vehicle = @vehicle")
vRP._prepare("creative/get_vehicles", "SELECT * FROM vrp_user_vehicles WHERE user_id = @user_id AND vehicle = @vehicle")
vRP._prepare("creative/set_update_vehicles", "UPDATE vrp_user_vehicles SET engine = @engine, body = @body, fuel = @fuel WHERE user_id = @user_id AND vehicle = @vehicle")
vRP._prepare("creative/set_detido", "UPDATE vrp_user_vehicles SET detido = @detido, time = @time WHERE user_id = @user_id AND vehicle = @vehicle")
vRP._prepare("creative/set_ipva", "UPDATE vrp_user_vehicles SET ipva = @ipva WHERE user_id = @user_id AND vehicle = @vehicle")
vRP._prepare("creative/move_vehicle", "UPDATE vrp_user_vehicles SET user_id = @nuser_id WHERE user_id = @user_id AND vehicle = @vehicle")
vRP._prepare("creative/add_vehicle", "INSERT IGNORE INTO vrp_user_vehicles(user_id,vehicle,ipva) VALUES(@user_id,@vehicle,@ipva)")
vRP._prepare("creative/con_maxvehs", "SELECT COUNT(vehicle) as qtd FROM vrp_user_vehicles WHERE user_id = @user_id")
vRP._prepare("creative/rem_srv_data", "DELETE FROM vrp_srv_data WHERE dkey = @dkey")
vRP._prepare("creative/get_estoque", "SELECT * FROM vrp_estoque WHERE car = @car")
vRP._prepare("creative/set_estoque", "UPDATE vrp_estoque SET stock = @stock WHERE car = @car")
vRP._prepare("creative/get_users", "SELECT * FROM vrp_users WHERE id = @user_id")
-----------------------------------------------------------------------------------------------------------------------------------------
-- BUYDEALER
-----------------------------------------------------------------------------------------------------------------------------------------
function src.buyDealer(name, price, stock)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local maxvehs = vRP.query("creative/con_maxvehs", { user_id = parseInt(user_id) })
        local maxcars = vRP.query("creative/get_users", { user_id = parseInt(user_id) })
        if vRP.hasPermission(user_id, "conce.permissao") then
            if parseInt(maxvehs[1].qtd) >= parseInt(maxcars[1].garagem) + 100 then
                TriggerClientEvent("Notify", source, "importante", "Você atingiu o número máximo de veículos em sua garagem.", 8000)
                return
            end
        else
            if parseInt(maxvehs[1].qtd) >= parseInt(maxcars[1].garagem) then
                TriggerClientEvent("Notify", source, "importante", "Você atingiu o número máximo de veículos em sua garagem.", 8000)
                return
            end
        end

        local vehicle = vRP.query("creative/get_vehicles", { user_id = parseInt(user_id), vehicle = name })
        if vehicle[1] then
            TriggerClientEvent("Notify", source, "importante", "Você já possui um <b>" .. vRP.vehicleName(name) .. "</b> em sua garagem.", 10000)
            return
        else
            if parseInt(stock) <= 0 then
                TriggerClientEvent("Notify", source, "aviso", "Estoque de <b>" .. vRP.vehicleName(name) .. "</b> indisponivel.", 8000)
                return
            end
            if vRP.tryFullPayment(user_id, parseInt(price)) then
                vRP.execute("creative/set_estoque", { car = name, stock = parseInt(stock) - 1 })
                vRP.execute("creative/add_vehicle", { user_id = parseInt(user_id), vehicle = name, ipva = os.time() })
                TriggerClientEvent("Notify", source, "sucesso", "Você comprou um <b>" .. vRP.vehicleName(name) .. "</b> por <b>$ " .. price .. " dólares</b>.", 10000)
            else
                TriggerClientEvent("Notify", source, "negado", "Dinheiro insuficiente.", 10000)
            end
        end
    end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- BUYIMPORT
-----------------------------------------------------------------------------------------------------------------------------------------
function src.buyImport(name, price, stock)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local maxvehs = vRP.query("creative/con_maxvehs", { user_id = parseInt(user_id) })
        local maxcars = vRP.query("creative/get_users", { user_id = parseInt(user_id) })
        if vRP.hasPermission(user_id, "conce.permissao") then
            if parseInt(maxvehs[1].qtd) >= parseInt(maxcars[1].garagem) + 100 then
                TriggerClientEvent("Notify", source, "importante", "Você atingiu o número máximo de veículos em sua garagem.", 8000)
                return
            end
        else
            if parseInt(maxvehs[1].qtd) >= parseInt(maxcars[1].garagem) then
                TriggerClientEvent("Notify", source, "importante", "Você atingiu o número máximo de veículos em sua garagem.", 8000)
                return
            end
        end

        if not vRP.hasPermission(user_id, "carrosvip.permissao") then
            TriggerClientEvent("Notify", source, "importante", "Você precisa ter permissão para comprar carros importados!", 8000)
            return
        end

        local vehicle = vRP.query("creative/get_vehicles", { user_id = parseInt(user_id), vehicle = name })
        if vehicle[1] then
            TriggerClientEvent("Notify", source, "importante", "Você já possui um <b>" .. vRP.vehicleName(name) .. "</b> em sua garagem.", 10000)
            return
        else
            if parseInt(stock) <= 0 then
                TriggerClientEvent("Notify", source, "aviso", "Estoque de <b>" .. vRP.vehicleName(name) .. "</b> indisponivel.", 8000)
                return
            end
            if vRP.tryFullPayment(user_id, parseInt(price)) then
                vRP.execute("creative/set_estoque", { car = name, stock = parseInt(stock) - 1 })
                vRP.execute("creative/add_vehicle", { user_id = parseInt(user_id), vehicle = name, ipva = os.time() })
                TriggerClientEvent("Notify", source, "sucesso", "Você comprou um <b>" .. vRP.vehicleName(name) .. "</b> por <b>$ " .. price .. " dólares</b>.", 10000)
            else
                TriggerClientEvent("Notify", source, "negado", "Dinheiro insuficiente.", 10000)
            end
        end
    end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- SELLDEALER
-----------------------------------------------------------------------------------------------------------------------------------------
function src.sellDealer(name, price, stock)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local vehicle = vRP.query("creative/get_vehicles", { user_id = parseInt(user_id), vehicle = name })
        if vehicle[1] then
            vRP.execute("creative/rem_vehicle", { user_id = parseInt(user_id), vehicle = name })
            vRP.execute("creative/rem_srv_data", { dkey = "custom:u" .. parseInt(user_id) .. "veh_" .. name })
            vRP.execute("creative/rem_srv_data", { dkey = "chest:u" .. parseInt(user_id) .. "veh_" .. name })
            vRP.execute("creative/set_estoque", { car = name, stock = parseInt(stock) + 1 })
            vRP.giveMoney(user_id, parseInt(price))
            TriggerClientEvent("Notify", source, "sucesso", "Você vendeu um <b>" .. vRP.vehicleName(name) .. "</b> por <b>$" .. vRP.format(parseInt(vRP.vehiclePrice(name) * 0.85)) .. " dólares</b>.", 10000)
        end
    end
end

function src.permissao()
    local source = source
    local user_id = vRP.getUserId(source)
    return vRP.hasPermission(user_id, "conce.permissao")
end

function src.id()
    local source = source
    local user_id = vRP.getUserId(source)
    return user_id
end