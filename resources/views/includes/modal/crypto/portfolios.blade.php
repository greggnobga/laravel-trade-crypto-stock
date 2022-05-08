<div class="crypto-portfolio-insert">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" value="0" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-order-label" for="id">Order</label>
            <select name="order" class="modal-order" id="order">
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </select>
            <span class="modal-error modal-order-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-wallet-label" for="wallet">Wallet</label>
            <input id="wallet" class="modal-wallet" name="wallet" type="text" placeholder="Binance" required/>
            <span class="modal-error modal-wallet-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-quantity-label" for="quantity">Quantity</label>
            <input id="quantity" class="modal-quantity" name="quantity" type="number" placeholder="0.00" required/>
            <span class="modal-error modal-quantity-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="number" placeholder="00.00" required/>
            <span class="modal-error modal-capital-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-insert" type="submit">Add</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="crypto-portfolio-update">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-order-label" for="wallet">Order</label>
            <input id="order" class="modal-order" name="wallet" type="text" placeholder="Order" required/>
            <span class="modal-error modal-order-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-wallet-label" for="wallet">Wallet</label>
            <input id="wallet" class="modal-wallet" name="wallet" type="text" placeholder="Binance" required/>
            <span class="modal-error modal-wallet-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-quantity-label" for="quantity">Quantity</label>
            <input id="quantity" class="modal-quantity" name="quantity" type="text" placeholder="0.00" required/>
            <span class="modal-error modal-quantity-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="00.00" required/>
            <span class="modal-error modal-capital-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-update" type="submit">Update</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="crypto-portfolio-destroy">
    <div class="crypto-modal">
        <div class="modal-group">
            <h2 class="modal-header">Destroy Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-order-label" for="wallet">Order</label>
            <input id="order" class="modal-order" name="wallet" type="text" placeholder="Order" disabled/>
            <span class="modal-error modal-order-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-wallet-label" for="wallet">Wallet</label>
            <input id="wallet" class="modal-wallet" name="wallet" type="text" placeholder="Binance" disabled/>
            <span class="modal-error modal-wallet-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" disabled/>
            <span class="modal-error modal-name-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" disabled/>
            <span class="modal-error modal-coin-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-quantity-label" for="quantity">Quantity</label>
            <input id="quantity" class="modal-quantity" name="quantity" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-quantity-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="00.00" disabled/>
            <span class="modal-error modal-capital-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-primary modal-destroy" type="submit">Destroy</button>
                </div>
            </div>
        </div>
    </div>
</div>


