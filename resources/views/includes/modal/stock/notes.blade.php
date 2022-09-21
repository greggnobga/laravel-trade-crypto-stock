<div class="stock-note-insert">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Add Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="0" value="0" disabled/>
        </div>
         <div class="modal-group">
            <label class="modal-section-label" for="id">Section</label>
            <select name="section" class="modal-section" id="section">
                <option value="note">Note</option>
                <option value="watchlist">Watchlist</option>
                <option value="portfolio">Portfolio</option>
                <option value="trade">Trade</option>
            </select>
            <span class="modal-error modal-section-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-note-label" for="note">Note</label>
            <textarea id="note" class="modal-note" name="note" type="text" placeholder="Type your trading note..." rows="4" cols="50" required></textarea>
            <span class="modal-error modal-note-error"></span>
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

<div class="stock-note-update">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Update Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id">ID</label>
            <input id="id" class="modal-id" name="id" type="number" placeholder="0" value="0" disabled/>
        </div>
        <div class="modal-group">
            <label class="modal-section-label" for="id">Section</label>
            <select name="section" class="modal-section" id="section">
                <option value="note">Note</option>
                <option value="watchlist">Watchlist</option>
                <option value="portfolio">Portfolio</option>
                <option value="trade">Trade</option>
            </select>
            <span class="modal-error modal-section-error"></span>
        </div>
        <div class="modal-group">
            <label class="modal-note-label" for="note">Note</label>
            <textarea id="note" class="modal-note" name="note" type="text" rows="4" cols="50" required></textarea>
            <span class="modal-error modal-note-error"></span>
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

<div class="stock-note-destroy">
    <div class="modal-form">
        <div class="modal-group">
            <h2 class="modal-header">Destroy Record</h2>
            <span class="modal-buffer"></span>
            <span class="modal-close">X</span>
        </div>
        <div class="modal-group">
            <label class="modal-id-label" for="id"></label>
            <p class="modal-id-question">You are about to delete note with ID #<span class="modal-id"></span>, are you sure you will not regret this action later?</p>
            <input id="id" class="modal-id" name="id" type="hidden"" value="0"/>
            <input id="section" class="modal-section" name="section" type="hidden" value="0"/>
            <input id="note" class="modal-note" name="note" type="hidden" value="0"/>
            <span class="modal-error modal-id-error"></span>
        </div>
        <div class="modal-group">
            <div class="modal-label"></div>
            <div class="modal-button">
                <div class="button-dismiss">
                    <button class="btn btn-danger modal-cancel" type="submit">Cancel</button>
                </div>
                <div class="button-submit">
                    <button class="btn btn-danger modal-destroy" type="submit">Destroy</button>
                </div>
            </div>
        </div>
    </div>
</div>