var phoneToEdit = '';

var API_URL = {
    CREATE: 'contacts/create',
    READ: 'contacts',
    UPDATE: 'contacts/update',
    DELETE: 'contacts/delete'
};

if(location.host === "nattila12github.io"){
    API_URL.READ = 'data/contacts.json'
}


function loadContacts() {
    $.ajax(API_URL.READ).done(function (contacts) {
        // console.info('contacts loaded', contacts);
        // console.log(contacts);
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}

function saveContact() {

    var firstName = document.querySelector('input[name=firstName]').value;
    var lastName = $('input[name=lastName]').val();
    var phone = $('input[name=phone]').val();
    console.debug('saveContact...', firstName, lastName, phone);

    var actionUrl = phoneToEdit ? API_URL.UPDATE +'?id=' + phoneToEdit : API_URL.CREATE;

    // if(phoneToEdit){actionUrl = 'contacts/update'} else {actionUrl = 'contacts/create'};

    $.post(actionUrl, {
        firstName, //shortcut from ES6 (key is the same as value variable name)
        lastName,
        phone: phone // ES5 (key= value)
    }).done(function (response) {
        console.warn('done create contact', response);
        phoneToEdit = '';
        if (response.success) {
            loadContacts();
        }
    });


}

function displayContacts(contacts) {
    var rows = contacts.map(function (contact) {
        // console.log('transform contact', contact);
        return `<tr>
          <td>${contact.firstName}</td>
          <td>${contact.lastName}</td>
          <td>${contact.phone}</td> 
          <td>
            <a href="${API_URL.DELETE}?id=${contact.id}">&#10006;</a>
            <a href="#" class="edit" data-id="${contact.id}" >&#9998;</a>
            </td>       
        </tr>`;
    });
    // console.warn('rows', rows);
    document.querySelector('tbody').innerHTML = rows.join('');
}

function initEvents() {
    // TODO use native click
    $("tbody").delegate("a.edit", "click", function () {
        phoneToEdit = this.getAttribute('data-id');

        var contact = globalContacts.find(function (contact) {
            return contact.id == phoneToEdit;
        });
        console.warn(' edit', phoneToEdit, contact);
        document.querySelector('input[name=firstName]').value = contact.firstName;
        $('input[name=lastName]').val(contact.lastName);
        $('input[name=phone]').val(contact.phone);
    });

    document.getElementById('search').addEventListener('input', doSearch);
};

function doSearch() {
    var value = this.value.toLowerCase();

    var filteredContacts = globalContacts.filter(function (contact) {
        return contact.firstName.toLowerCase().includes(value) ||
            contact.lastName.toLowerCase().includes(value) ||
            contact.phone.toLowerCase().includes(value);
    });

    displayContacts(filteredContacts);
}



loadContacts();
initEvents();



