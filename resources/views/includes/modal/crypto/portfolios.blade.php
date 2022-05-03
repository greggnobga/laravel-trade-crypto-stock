<div class="crypto-portfolio-insert-wrapper">
    <div class="crypto-portfolio-insert">
        <div class="crypto-portfolio-modal">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-close insert-close" data-section="insert">X</span>

            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" value="0" disabled/>

            <label class="modal-order-label" for="id">Order</label>
            <select name="order" class="modal-order" id="order">
                <option value=""></option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
            </select>
            <span class="modal-error modal-order-error"></span>

            <label class="modal-wallet-label" for="wallet">Wallet</label>
            <input id="wallet" class="modal-wallet" name="wallet" type="text" placeholder="Binance" required/>
            <span class="modal-error modal-wallet-error"></span>

            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>

            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>

            <label class="modal-quantity-label" for="quantity">Quantity</label>
            <input id="quantity" class="modal-quantity" name="quantity" type="number" placeholder="0.00" required/>
            <span class="modal-error modal-quantity-error"></span>

            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="number" placeholder="00.00" required/>
            <span class="modal-error modal-capital-error"></span>

            <button class="btn btn-danger modal-cancel insert-cancel" type="submit" data-section="insert">Cancel</button>
            <button class="btn btn-primary modal-submit insert-submit" type="submit" data-section="insert">Add</button>
        </div>
    </div>
</div>
<div class="crypto-portfolio-update-wrapper">
    <div class="crypto-portfolio-update">
        <div class="crypto-portfolio-modal">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-close update-close" data-section="update">X</span>

            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>

            <label class="modal-order-label" for="wallet">Order</label>
            <input id="order" class="modal-order" name="wallet" type="text" placeholder="Order" required/>
            <span class="modal-error modal-order-error"></span>

            <label class="modal-wallet-label" for="wallet">Wallet</label>
            <input id="wallet" class="modal-wallet" name="wallet" type="text" placeholder="Binance" required/>
            <span class="modal-error modal-wallet-error"></span>

            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" required/>
            <span class="modal-error modal-name-error"></span>

            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" required/>
            <span class="modal-error modal-coin-error"></span>

            <label class="modal-quantity-label" for="quantity">Quantity</label>
            <input id="quantity" class="modal-quantity" name="quantity" type="text" placeholder="0.00" required/>
            <span class="modal-error modal-quantity-error"></span>

            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="00.00" required/>
            <span class="modal-error modal-capital-error"></span>

            <button class="btn btn-danger modal-cancel update-cancel" type="submit" data-section="update">Cancel</button>
            <button class="btn btn-primary modal-submit update-submit" type="submit" data-section="update">Update</button>
        </div>
    </div>
</div>
<div class="crypto-portfolio-destroy-wrapper">
    <div class="crypto-portfolio-destroy">
        <div class="crypto-portfolio-modal">
            <h2 class="modal-header">Destroy Record</h2>
            <span class="modal-close destroy-close" data-section="destroy">X</span>

            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="ID" disabled/>

            <label class="modal-order-label" for="wallet">Order</label>
            <input id="order" class="modal-order" name="wallet" type="text" placeholder="Order" disabled/>
            <span class="modal-error modal-order-error"></span>

            <label class="modal-wallet-label" for="wallet">Wallet</label>
            <input id="wallet" class="modal-wallet" name="wallet" type="text" placeholder="Binance" disabled/>
            <span class="modal-error modal-wallet-error"></span>

            <label class="modal-name-label" for="name">Name</label>
            <input id="name" class="modal-name" name="name" type="text" placeholder="Bitcoin" disabled/>
            <span class="modal-error modal-name-error"></span>

            <label class="modal-coin-label" for="coin">Coin</label>
            <input id="coin" class="modal-coin" name="coin" type="text" placeholder="BTC" disabled/>
            <span class="modal-error modal-coin-error"></span>

            <label class="modal-quantity-label" for="quantity">Quantity</label>
            <input id="quantity" class="modal-quantity" name="quantity" type="text" placeholder="0.00" disabled/>
            <span class="modal-error modal-quantity-error"></span>

            <label class="modal-capital-label" for="capital">Capital</label>
            <input id="capital" class="modal-capital" name="capital" type="text" placeholder="00.00" disabled/>
            <span class="modal-error modal-capital-error"></span>

            <button class="btn btn-danger modal-cancel destroy-cancel" type="submit" data-section="destroy">Cancel</button>
            <button class="btn btn-primary modal-submit destroy-submit" type="submit" data-section="destroy">Destroy</button>
        </div>
    </div>
</div>


